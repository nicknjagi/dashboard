import { LibraryItem } from "@/types";
import UpdateLibraryItemModal from "./modals/updateLibraryItemModal";
import DeleteLibraryItemModal from "./modals/deleteLibraryItemModal";

type Props = {
  libraryItem: LibraryItem;
};

export default function MusicItem({ libraryItem }: Props) {
  return (
    <div className="p-4 w-full md:max-w-[333px] border shadow-md border-cultured/20 rounded-lg bg-forrestGreen">
      <h2 className="capitalize mb-2">
        {libraryItem.Name}
      </h2>
      <audio className="" controls>
        <source src={libraryItem.link} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="flex gap-2 mt-4">
        <UpdateLibraryItemModal libraryItem={libraryItem} />
        <DeleteLibraryItemModal libraryItem={libraryItem} />
      </div>
    </div>
  );
}
