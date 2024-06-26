import LibraryList from "@/components/libraryList";
import AddToLibraryModal from "@/components/modals/addToLibraryModal";

type Props = {};

export default function Facilitators({}: Props) {
  return (
    <section className="py-2">
      <div className="flex justify-between items-center">
        <h1 className={"text-xl md:text-2xl font-medium"}>Library</h1>
      </div>
      <LibraryList />
    </section>
  );
}
