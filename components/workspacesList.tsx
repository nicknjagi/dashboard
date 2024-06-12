"use client";

import { getWorkspaces } from "@/app/lib/workspaces";
import { User, Workspace } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Loading from "./loading";
import { Chip } from "@nextui-org/chip";
import UpdateWorkspaceModal from "./modals/updateWorkspaceModal";
import DeleteWorkspaceModal from "./modals/deleteWorkspaceModal";
import { ChevronRight, UsersRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { pb } from "@/app/lib/utils";

type Props = {};

export default function WorkspacesList({}: Props) {
  const [userModel, setUserModel] = useState<User | null>(null);
  const { data, error, isLoading } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });

  useEffect(() => {
    const user = pb.authStore.model as User;
    setUserModel(user);
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <p className="mt-10">Error loading workspaces</p>;

  return (
    <section className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
      {data.items.map((workspace: Workspace) => {
        return (
          <div
            key={workspace.id}
            className="pt-4 w-full md:max-w-sm border shadow border-cultured/20 rounded-lg"
          >
            <h2 className="mb-6 text-xl px-4">{workspace.name}</h2>

            <div className="flex justify-between px-4 mb-4">
              <div className="flex gap-1 items-center">
                <UsersRound size={18} />
                <span className="text-sm">
                  Users <Chip size="sm">{workspace.users.length}</Chip>
                </span>
              </div>
              {workspace.active ? (
                <Chip size="sm" color="success">
                  Active
                </Chip>
              ) : (
                <Chip size="sm">Inactive</Chip>
              )}
            </div>

            <div className="flex justify-between px-4 py-4 border-t border-cultured/20">
              {userModel?.AccountType === 'ADMIN' && <div className="flex gap-2">
                <UpdateWorkspaceModal workspace={workspace} />
                <DeleteWorkspaceModal workspace={workspace} />
              </div>}
              <Link
                className="flex items-center text-sm text-cyan-400 hover:text-cyan-400/80"
                href={`/workspaces/${workspace.id}/sessions`}
              >
                <span>sessions </span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        );
      })}
      
    </section>
  );
}
