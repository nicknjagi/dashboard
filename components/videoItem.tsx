import { LibraryItem } from "@/types";
import UpdateLibraryItemModal from "./modals/updateLibraryItemModal";
import DeleteLibraryItemModal from "./modals/deleteLibraryItemModal";

type Props = {
  libraryItem: LibraryItem;
};

export default function VideoItem({ libraryItem }: Props) {
  return (
    <div className="p-4 w-full md:max-w-sm border shadow bg-forrestGreen border-cultured/20 rounded-xl">
      <h2 className="capitalize mb-2">
        {libraryItem.Name}
      </h2>
      <p>{libraryItem.description}</p>
      <video controls>
        <source src={libraryItem.link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex gap-2 mt-4">
        <UpdateLibraryItemModal libraryItem={libraryItem} />
        <DeleteLibraryItemModal libraryItem={libraryItem} />
      </div>
    </div>
  );
}
