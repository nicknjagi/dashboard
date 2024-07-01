"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { activeUserCount } from "@/app/lib/accounts";

type Props = {};

export default function ActiveUsersCountCard({}: Props) {
  const { data: asCount, error, isLoading} = useQuery({
    queryKey: ["activeUsersCount"],
    queryFn: activeUserCount,
  });

  return (
    <div className="card w-full max-w-xs p-4">
      <h2 className="mb-2 text-neutral-300">Active Users</h2>
      <div className="flex items-end justify-between ">
        <span className="text-3xl md:text-4xl font-medium">
          {asCount?.totalItems}
        </span>
        <Link
          href="/accounts"
          className="grid place-content-center w-8 h-8 bg-cultured/5 hover:bg-cultured/10 rounded-full"
        >
          <ChevronRight />
        </Link>
      </div>
    </div>
  );
}
