"use client";

import { Account } from "@/types";
import Loading from "./loading";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAccounts } from "@/app/lib/accounts";
import { Chip } from "@nextui-org/chip";
import { DateTime } from "luxon";
import UpdateAccountModal from "./modals/updateAccountModal";
import { Pagination } from "@nextui-org/pagination";
import { useState } from "react";
import UserInfo from "./userInfo";

type Props = {};

export default function AccountsList({}: Props) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, error, isLoading } = useQuery({
    queryKey: ["accounts", page],
    queryFn: () => getAccounts(page, perPage),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="mt-10">Error fetching accounts</p>;
  }

  return (
    <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
      {data.items.length > 0 ? (
        data.items.map((account: Account) => (
          <div
            key={account.id}
            className="flex flex-col justify-between p-4 w-full md:max-w-md card"
          >
            <div className="flex justify-between">
              <div>
                <UserInfo userId={account.userId} accountId={account.id}/>
              </div>
              <div>
                <UpdateAccountModal account={account} />
              </div>
            </div>
            <div className="flex justify-between mt-2 pt-2 text-sm text-cultured/70 border-t border-cultured/15">
              <p className="flex flex-wrap gap-1 text-sm text-cultured/70">
                <span>Subscription: </span>
                <span>{account.subscription_type}</span>
              </p>
              {account.active ? (
                <Chip
                  size="sm"
                  color="success"
                  classNames={{
                    base: "px-1 scale-90",
                    content: "text-black font-semibold",
                  }}
                >
                  Active
                </Chip>
              ) : (
                <Chip size="sm">Paused</Chip>
              )}
            </div>
            <p className="mt-1 text-sm text-cultured/70">
              Valid Until:{" "}
              {DateTime.fromISO(account.valid_until.replace(" ", "T"), {
                zone: "utc",
              }).toFormat("dd/MM/yyyy hh:mm a")}
            </p>
          </div>
        ))
      ) : (
        <p className="mt-10">No accounts to display.</p>
      )}
      {data?.totalItems > 10 && (
        <div className="w-full flex justify-start mt-6">
          <Pagination
            isCompact
            showControls
            page={page}
            total={data.totalPages}
            onChange={setPage}
            classNames={{
              cursor:
                "bg-forrestGreen border border-cultured/20 text-white font-bold",
            }}
          />
        </div>
      )}
    </div>
  );
}
