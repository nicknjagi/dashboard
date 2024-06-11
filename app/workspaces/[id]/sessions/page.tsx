import CreateSessionModal from "@/components/modals/createSessionModal";
import SessionsList from "@/components/sessionsList";
import Link from "next/link";

type Props = {};

export default function Sessions({}: Props) {

  return (
    <div className="py-2">
      <div className="flex justify-between items-center">
      <div className="flex items-end gap-2">
          <Link href={'/workspaces'} className="text-neutral-500">{"workspaces"}<span className="ml-2 text-xl text-neutral-500">/</span></Link>
          <h1 className={"text-xl md:text-2xl font-medium"}>Sessions</h1>
      </div>
        <CreateSessionModal />
      </div>
      <SessionsList />
    </div>
  );
}
