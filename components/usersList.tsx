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
import { User as TUser } from "@/types";
import { BadgeCheck } from "lucide-react";
import Loading from "./loading";
import { User } from "@nextui-org/user";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { fetchUsers } from "@/app/lib/users";
import { Pagination } from "@nextui-org/pagination";
import { useState } from "react";

type Props = {};

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "verified",
    label: "VERIFIED",
  },
  {
    key: "created",
    label: "CREATED",
  },
];

export default function UsersList({}: Props) {
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  const { data, error, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page, perPage),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="mt-10">Error fetching users</p>;
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl shadow-md max-w-fit">
      <Table
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              page={page}
              total={data.totalPages}
              onChange={setPage}
              classNames={{
                cursor:"bg-cultured/20 shadow-cultured/10 text-white font-bold"
              }}
            />
          </div>
        }
        classNames={{
          wrapper: [
            "bg-background border border-cultured/10 w-full min-w-[640px] max-w-fit",
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
            {(facilitator: TUser) => (
              <TableRow key={facilitator.username}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "verified" ? (
                      facilitator.verified ? (
                        <span className="flex justify-center lg:justify-start">
                          <BadgeCheck color="#48b446" />
                        </span>
                      ) : (
                        <span className="block text-center lg:text-start">
                          -
                        </span>
                      )
                    ) : columnKey === "name" ? (
                      <User
                        avatarProps={{
                          radius: "lg",
                          src: facilitator?.avatar
                            ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/files/users/${facilitator.id}/${facilitator?.avatar}`
                            : "/user-round.svg",
                        }}
                        description={facilitator.email}
                        name={facilitator.name}
                      >
                        {facilitator.email}
                      </User>
                    ) : columnKey === "created" ? (
                      <span>{DateTime.fromISO(facilitator.created.replace(" ", "T"), { zone: 'utc' }).toFormat("dd/MM/yyyy hh:mm a")}</span>
                    ) : (
                      getKeyValue(facilitator, columnKey)
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
