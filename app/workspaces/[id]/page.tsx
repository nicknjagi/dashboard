import CreateSessionModal from "@/components/modals/createSessionModal";
import SessionsList from "@/components/sessionsList";
import Link from "next/link";

type Props = {};

export default function Sessions({}: Props) {

  return (
    <div className="py-2">
      <SessionsList />
    </div>
  );
}
