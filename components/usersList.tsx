"use client";

import { User as TUser } from "@/types";
import { BadgeCheck, CircleAlert } from "lucide-react";
import Loading from "./loading";
import { User } from "@nextui-org/user";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/app/lib/users";
import { Pagination } from "@nextui-org/pagination";
import { useState } from "react";
import { Tooltip } from "@nextui-org/tooltip";

type Props = {};

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
    <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 ">
      {data.items.length > 0 ? (
        data.items.map((user: TUser) => (
          <div
            key={user.id}
            className="p-4 w-full md:max-w-sm border border-cultured/10 rounded-lg bg-forrestGreen"
          >
            <div className="flex items-center gap-4">
              <User
                avatarProps={{
                  radius: "lg",
                  src: user?.avatar
                    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/files/users/${user.id}/${user?.avatar}`
                    : "/user-round.svg",
                }}
                description={user.email}
                name={user.name}
              >
                {user.email}
              </User>
              {user.verified ? (
                <Tooltip
                  content="verified"
                  className="capitalize"
                  classNames={{
                    base:["rounded-lg bg-[#48b446]"],
                    content: [
                      "bg-transparent",
                      "px-2",
                      "text-sm text-black",
                    ],
                  }}
                >
                  <BadgeCheck
                    color="#48b446"
                    className="ml-auto cursor-pointer"
                  />
                </Tooltip>
              ) : (
                <Tooltip
                  content="unverified"
                  className="capitalize"
                  classNames={{
                    base:["rounded-lg bg-[#4d0000]"],
                    content: [
                      "bg-transparent",
                      "px-2",
                      "text-sm text-white",
                    ],
                  }}
                >
                  <CircleAlert
                    color="#4d0000"
                    className="ml-auto cursor-pointer"
                  />
                </Tooltip>
              )}
            </div>
            {/* <p className="mt-2 text-sm text-gray-600">
              Created:{" "}
              {DateTime.fromISO(user.created.replace(" ", "T"), {
                zone: "utc",
              }).toFormat("dd/MM/yyyy hh:mm a")}
            </p> */}
          </div>
        ))
      ) : (
        <p className="mt-10">No users to display.</p>
      )}
      <div className="w-full flex justify-start mt-6">
        <Pagination
          isCompact
          showControls
          page={page}
          total={data.totalPages}
          onChange={setPage}
          classNames={{
            cursor: "bg-forrestGreen shadow-sm shadow-cultured/10 text-white font-bold",
          }}
        />
      </div>
    </div>
  );
}
