"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { workspacesCount } from "@/app/lib/workspaces";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {};

export default function WorkspacesCountCard({}: Props) {
  const {
    data: wsCount,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["workspacesCount"],
    queryFn: workspacesCount,
  });

  return (
    <div className="card w-full max-w-xs p-4">
      {isLoading ? (
        <SkeletonTheme baseColor="#014d4d" highlightColor="#026666">
          <Skeleton width={170} height={20} />
          <div className="flex justify-between items-end mt-2">
            <Skeleton width={40} height={40} />
            <Skeleton circle width={32} height={32} />
          </div>
        </SkeletonTheme>
      ) : (
        <>
          <h2 className="mb-2 text-neutral-300">Total workspaces</h2>
          <div className="flex items-end justify-between ">
            <span className="text-3xl md:text-4xl font-medium">
              {wsCount?.totalItems}
            </span>
            <Link
              href="/workspaces"
              className="grid place-content-center w-8 h-8 bg-cultured/5 hover:bg-cultured/10 rounded-full"
            >
              <ChevronRight />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
