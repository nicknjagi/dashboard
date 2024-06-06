"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { User as TUser} from "@/types";
import { fetchFacilitators } from "@/app/lib/utils";
import { BadgeCheck } from "lucide-react";
import Loading from "./loading";
import {User} from "@nextui-org/user";
type Props = {};

const columns = [
  // {
  //   key: "username",
  //   label: "USERNAME",
  // },
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

export default function FacilitatorsList({}: Props) {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getUsers() {
      try {
        const data = await fetchFacilitators();
        setUsers(data.items);
        // console.log(data.items);
      } catch (error) {
        setError("Error fetching facilitators data.");
      } finally {
        setIsLoading(false);
      }
    }
    getUsers();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl shadow-md max-w-fit">
      <Table
        // isStriped
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
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.username}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "verified" ? (
                    item.verified ? (
                      <span className="flex justify-center lg:justify-start">
                        <BadgeCheck color="#48b446" />
                      </span>
                    ) : (
                      <span className="block text-center lg:text-start">-</span>
                    )
                  ) : columnKey === "name" ? (
                    <User
                      avatarProps={{
                        radius: "lg",
                        src: item?.avatar ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/files/users/${item.id}/${item?.avatar}` : "/user-round.svg",
                      }}
                      description={item.email}
                      name={item.name}
                    >
                      {item.email}
                    </User>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
