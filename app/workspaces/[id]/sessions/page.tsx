import CreateSessionModal from "@/components/modals/createSessionModal";
import SessionsList from "@/components/sessionsList";

type Props = {};

export default function Sessions({}: Props) {

  return (
    <div className="py-2">
      <div className="flex justify-between items-center">
        <h1 className={"text-xl md:text-2xl font-medium"}>Sessions</h1>
        <CreateSessionModal />
      </div>
      <SessionsList />
    </div>
  );
}
