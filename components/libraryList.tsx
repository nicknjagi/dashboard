"use client";

import { LibraryItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Loading from "./loading";
import { getLibraryItems } from "@/app/lib/library";
import { File, Music, Video } from "lucide-react";
import UpdateLibraryItemModal from "./modals/updateLibraryItemModal";
import DeleteLibraryItemModal from "./modals/deleteLibraryItemModal";

type Props = {};

export default function LibraryList({}: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["libraries"],
    queryFn: getLibraryItems,
  });

  if (isLoading) return <Loading />;
  if (error) return <p className="mt-10">Something went wrong</p>;

  return (
    <section className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
      {data.items.map((library: LibraryItem) => {
        return (
          <div
            key={library.id}
            className="p-4 w-full md:max-w-sm border shadow border-cultured/20 rounded-lg"
          >
            <div className="flex gap-4 items-center">
              {library.type === "VIDEO" && <Video />}
              {library.type === "MUSIC" && <Music />}
              {library.type === "FILE" && <File />}
              <h2 className="text-xl capitalize">
                {library.name}
              </h2>
            </div>
            <p>{library.description}</p>
            {/* <p>{library.content}</p> */}

            <div className="flex gap-2 mt-4">
              <UpdateLibraryItemModal libraryItem={library}/>
              <DeleteLibraryItemModal libraryItem={library}/>
            </div>
          </div>
        );
      })}
    </section>
  );
}
