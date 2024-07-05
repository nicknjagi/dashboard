'use client'

import { getWorkspace } from "@/app/lib/workspaces";
import SessionsList from "@/components/sessionsList";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

type Props = {};

export default function Sessions({}: Props) {
  const { id } = useParams();
  const { data: workspace } = useQuery({
    queryKey: ["getWorkspace"],
    queryFn: () => getWorkspace(id as string),
  });
  
  return (
    <div className="py-2">
      <SessionsList workspace={workspace}/>
    </div>
  );
}
