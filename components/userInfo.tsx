"use client";

import { getUserData } from "@/app/lib/users";
import { useQuery } from "@tanstack/react-query";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function UserInfo({ userId }: { userId: string }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getUserData", userId],
    queryFn: () => getUserData(userId),
    refetchOnMount: true,
    staleTime: 0,
  });

  console.log(data);

  return (
    <div>
      {isLoading && (
        <SkeletonTheme baseColor="#014d4d" highlightColor="#026666">
          <Skeleton width={150} height={20} />
          <Skeleton width={200} height={20} />
        </SkeletonTheme>
      )}
      {error && <p>{error.message}</p>}
      {data?.user && (
        <div>
          <p>{`${data.user.first_name} ${data.user.last_name}`}</p>
          <p>{data.user.email_addresses[0].email_address}</p>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
