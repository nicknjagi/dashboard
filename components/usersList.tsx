"use client";

import { ClerkUser } from "@/types";
import Loading from "./loading";
import { User } from "@nextui-org/user";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchTotalUsers, fetchUsers } from "@/app/lib/users";
import { Pagination } from "@nextui-org/pagination";
import { useState } from "react";
import AddToWorkspaceModal from "./modals/addToWorkspaceModal";

type Props = {};

export default function UsersList({}: Props) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const {
    data: totalUsers,
    error: totalUsersError,
    isLoading: isTotalUsersLoading,
  } = useQuery({
    queryKey: ["totalUsers"],
    queryFn: fetchTotalUsers,
  });

  const {
    data: usersData,
    error: usersError,
    isLoading: isUsersLoading,
  } = useQuery({
    queryKey: ["users", page, perPage],
    queryFn: () => fetchUsers(page, perPage),
    placeholderData: keepPreviousData,
  });

  if (isTotalUsersLoading || isUsersLoading) {
    return <Loading />;
  }

  if (totalUsersError || usersError) {
    return <p className="mt-10">Error fetching users</p>;
  }

  const totalPages = totalUsers ? Math.ceil(totalUsers / perPage) : 1;

  return (
    <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 ">
      {usersData?.users?.length > 0 ? (
        usersData.users.map((user: ClerkUser) => (
          <div
            key={user.id}
            className="p-4 w-full md:max-w-sm border border-cultured/10 rounded-lg bg-forrestGreen"
          >
              <User
                avatarProps={{
                  radius: "lg",
                  src: user?.image_url ? user?.image_url : "/user-round.svg",
                }}
                description={user.email_addresses[0].email_address}
                name={`${user.first_name} ${user.last_name}`}
              >
                {user.email_addresses[0].email_address}
              </User>
              <div className="w-fit ">
                <AddToWorkspaceModal userId={user.id}/>
              </div>
          </div>
        ))
      ) : (
        <p className="mt-10">No users to display.</p>
      )}
      {totalPages > 1 && (
        <div className="w-full flex justify-start mt-6">
          <Pagination
            isCompact
            showControls
            page={page}
            total={totalPages}
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
