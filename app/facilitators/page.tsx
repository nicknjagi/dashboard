import SendTokenModal from "@/components/modals/sendTokenModal";

type Props = {};

export default function Facilitators({}: Props) {

  return (
    <section className="">
      <div className="flex justify-between items-center">
        <h1 className={"text-xl md:text-3xl font-medium"}>Facilitators</h1>
        <SendTokenModal />
      </div>
    </section>
  );
}
