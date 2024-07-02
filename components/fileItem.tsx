import { LibraryItem } from "@/types";
import UpdateFileForm from "./forms/updateFileForm";
import DeleteLibraryItemModal from "./modals/deleteLibraryItemModal";
import Content from "./content";
import parse from "html-react-parser";

type Props = {
  libraryItem: LibraryItem;
};

export default function FileItem({ libraryItem }: Props) {
  return (
    <div className="p-4 w-full md:max-w-[480px] border shadow bg-forrestGreen border-cultured/20 rounded-xl">
      <h2 className="text-xl font-semibold capitalize underline underline-offset-4">{libraryItem.Name}</h2>
      <div className="overflow-hidden h-56 text-ellipsis prose prose-invert">{parse(libraryItem.content)}</div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <UpdateFileForm libraryItem={libraryItem} />
          <DeleteLibraryItemModal libraryItem={libraryItem} />
        </div>
        <Content libraryItem={libraryItem}>{libraryItem.content}</Content>
      </div>
    </div>
  );
}
