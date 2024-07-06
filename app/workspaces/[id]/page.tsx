'use client'

import { getWorkspace } from "@/app/lib/workspaces";
import Loading from "@/components/loading";
import SessionsList from "@/components/sessionsList";
import WorkspaceUsers from "@/components/workspaceUsers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

type Props = {};

export default function Sessions({}: Props) {
  const { id } = useParams();
  const { data: workspace, isLoading, error } = useQuery({
    queryKey: ["getWorkspace"],
    queryFn: () => getWorkspace(id as string),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="mt-10">Error fetching data</p>;
  }
  
  return (
    <div className="py-2">
      <SessionsList workspace={workspace}/>
      <WorkspaceUsers accounts={workspace?.expand?.users} />
    </div>
  );
}
