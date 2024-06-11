"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { Account } from "@/types";
import Loading from "./loading";
import { useQuery } from "@tanstack/react-query";
import { getAccounts } from "@/app/lib/accounts";
import { Chip } from "@nextui-org/chip";
import { DateTime } from "luxon";
import UpdateAccountModal from "./modals/updateAccountModal";

type Props = {};

const columns = [
  {
    key: "userId",
    label: "USER ID",
  },
  {
    key: "subscription_type",
    label: "SUBSCRIPTION TYPE",
  },
  {
    key: "active",
    label: "ACTIVE",
  },
  {
    key: "valid_until",
    label: "VALID UNTIL",
  },{
    key: "actions",
    label: "ACTIONS",
  },
];

export default function AccountsList({}: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="mt-10">Error fetching accounts</p>;
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl shadow-md max-w-fit">
      <Table
        // isStriped
        classNames={{
          wrapper: [
            "bg-background border border-cultured/10 w-full min-w-[700px] max-w-fit",
          ],
          th: ["bg-cultured/10 "],
        }}
        aria-label="Facilitators list"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        {data.items.length > 0 ? (
          <TableBody items={data.items}>
            {(account: Account) => (
              <TableRow key={account.userId}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "active" ? (
                      account.active ? (
                        <Chip size="sm" color="success">Active</Chip>
                      ) : (
                        <Chip size="sm">Paused</Chip>
                      )
                    ) : columnKey === "actions" ? (
                      <UpdateAccountModal account={account}/>
                    ) : columnKey === "valid_until" ? (
                      <span>{DateTime.fromISO(account.valid_until.replace(" ", "T"), { zone: 'utc' }).toFormat("dd/MM/yyyy hh:mm a")}</span>
                    ) : (
                      getKeyValue(account, columnKey)
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        )}
      </Table>
    </div>
  );
}
