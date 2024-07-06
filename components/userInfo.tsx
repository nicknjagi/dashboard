"use client";

import { getUserData } from "@/app/lib/users";
import { User } from "@nextui-org/user";
import { useQuery } from "@tanstack/react-query";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AddToWorkspaceModal from "./modals/addToWorkspaceModal";
import { getWorkspaceByAccountId } from "@/app/lib/workspaces";
import RemoveFromWorkspace from "./removeFromWorkspace";

export function UserInfo({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) {
  const workspaceQuery = useQuery({
    queryKey: ["workspaceForAccount", accountId],
    queryFn: () => getWorkspaceByAccountId(accountId),
    refetchOnMount: true,
    staleTime: 0,
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["getUserData", userId],
    queryFn: () => getUserData(userId),
    refetchOnMount: true,
    staleTime: 0,
  });

  return (
    <div>
      {(isLoading) && (
        <SkeletonTheme baseColor="#014d4d" highlightColor="#026666">
          <Skeleton width={200} height={35} />
          <Skeleton width={150} height={20} />
        </SkeletonTheme>
      )}
      {(error || workspaceQuery.error) && <p>{error?.message}</p>}
      {data?.user && (
        <div className="flex flex-col gap-1">
          <User
            avatarProps={{
              radius: "lg",
              src: data?.user?.image_url
                ? data?.user?.image_url
                : "/user-round.svg",
            }}
            description={data?.user.email_addresses[0].email_address}
            name={`${data?.user.first_name} ${data?.user.last_name}`}
          >
            {data?.user.email_addresses[0].email_address}
          </User>
          <div className="w-fit mr-auto">
            {workspaceQuery.data?.items[0] ? (
              <RemoveFromWorkspace
                accountId={accountId}
                workspaceDetails={workspaceQuery.data?.items[0]}
              />
            ) : null}
            {!workspaceQuery.data?.items[0] && (
              <AddToWorkspaceModal accountId={accountId} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
