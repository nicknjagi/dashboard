import FacilitatorsList from "@/components/facilitatorsList";
import SendTokenModal from "@/components/modals/sendTokenModal";

type Props = {};

export default function Facilitators({}: Props) {
  return (
    <section className="py-4">
      <div className="flex justify-between items-center">
        <h1 className={"text-xl md:text-2xl font-medium"}>Facilitators</h1>
        <SendTokenModal />
      </div>
      <FacilitatorsList />
    </section>
  );
}
