"use client";

import { User as TUser } from "@/types";
import { fetchFacilitators } from "@/app/lib/facilitators";
import { BadgeCheck, CircleAlert } from "lucide-react";
import Loading from "./loading";
import { User } from "@nextui-org/user";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pagination } from "@nextui-org/pagination";
import { Tooltip } from "@nextui-org/tooltip";

type Props = {};

export default function FacilitatorsList({}: Props) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, error, isLoading } = useQuery({
    queryKey: ["facilitators", page],
    queryFn: () => fetchFacilitators(page, perPage),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="mt-10">Error fetching facilitators</p>;
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
              <div className="ml-auto cursor-pointer scale-75">
                {user.verified ? (
                  <Tooltip
                    content="verified"
                    className="capitalize"
                    classNames={{
                      base: ["rounded-lg", "scale-50"],
                      content: ["px-2", "text-[12px]"],
                    }}
                  >
                    <BadgeCheck color="#48b446" />
                  </Tooltip>
                ) : (
                  <Tooltip
                    content="unverified"
                    className="capitalize"
                    classNames={{
                      base: ["rounded-lg", "scale-50"],
                      content: ["px-2", "text-[12px]"],
                    }}
                  >
                    <CircleAlert color="#ff4d4d" />
                  </Tooltip>
                )}
              </div>
            </div>
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
            cursor:
              "bg-forrestGreen border border-cultured/20 text-white font-bold",
          }}
        />
      </div>
    </div>
  );
}
