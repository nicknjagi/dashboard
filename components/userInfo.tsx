"use client";

import { getUserData } from "@/app/lib/users";
import { User } from "@nextui-org/user";
import { useQuery } from "@tanstack/react-query";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AddToWorkspaceModal from "./modals/addToWorkspaceModal";
import RemoveFromWorkspace from "./removeFromWorkspace";
import { usePathname } from "next/navigation";

export function UserInfo({
  userId,
  accountId,
  workspaceId
}: {
  userId: string;
  accountId: string;
  workspaceId: string;
}) {
  const pathname = usePathname();

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
      {(error) && <p>{error?.message}</p>}
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
            {pathname.includes('/workspace') ? (
              <RemoveFromWorkspace
                accountId={accountId}
                workspaceId={workspaceId}
              />
            ) : <AddToWorkspaceModal accountId={accountId} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
