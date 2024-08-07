"use client";

import { Session, User, Workspace } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Loading from "./loading";
import { useEffect, useState } from "react";
import { pb } from "@/app/lib/utils";
import { getSessions } from "@/app/lib/sessions";
import { Chip } from "@nextui-org/chip";
import { DateTime } from "luxon";
import { useParams } from "next/navigation";
import UpdateSessionModal from "./modals/updateSessionModal";
import DeleteSessionModal from "./modals/deleteSessionModal";
import Link from "next/link";
import CreateSessionModal from "./modals/createSessionModal";

type Props = {
  workspace: Workspace
};

export default function SessionsList({workspace}:Props) {
  const { id } = useParams();
  const [userModel, setUserModel] = useState<User | null>(null);
  const { data, error, isLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => getSessions(id as string),
  });

  useEffect(() => {
    const user = pb.authStore.model as User;
    setUserModel(user);
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <p className="mt-10">Error fetching sessions</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-end gap-2">
          <Link href={"/workspaces"} className="text-neutral-300">
            {"back"}
            <span className="ml-2 text-xl text-neutral-500">/</span>
          </Link>
          <h1 className={"text-lg md:text-2xl font-medium"}>{workspace?.name}</h1>
        </div>
        <CreateSessionModal />
      </div>
      <section>
        <h3 className="my-2 font-medium text-lg">Sessions</h3>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
          {data.items.map((session: Session) => {
            // Add the 'T' separator to the date string
            const isoDateString = session.date.replace(" ", "T");
            // Parse and format the date using Luxon
            const formattedDate = DateTime.fromISO(isoDateString).toLocaleString(
              DateTime.DATETIME_MED
            );
            return (
              <div
                key={session.id}
                className="p-4 w-full md:max-w-sm border shadow bg-forrestGreen border-cultured/20 rounded-xl"
              >
                <div className="flex gap-4 justify-between">
                  <h2 className="mb-6 text-xl capitalize">
                    {session.type.split("_").join(" ").toLowerCase()}
                  </h2>
                  <Chip size="sm">{session.duration_in_hours} hour(s)</Chip>
                </div>
                <p>{formattedDate}</p>
                <div>
                  <span>Link - </span>{" "}
                  <a className="text-sky-200" href="#">
                    {session.link_to_session}
                  </a>
                </div>
                {(userModel?.AccountType === "ADMIN" ||
                  userModel?.id === workspace.facilitator) && (
                  <div className="flex gap-2 mt-4">
                    <UpdateSessionModal session={session} />
                    <DeleteSessionModal session={session} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
