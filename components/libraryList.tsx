"use client";

import { LibraryItem } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Loading from "./loading";
import { getLibraryItems } from "@/app/lib/library";
import { File, Music, Video } from "lucide-react";
import UpdateLibraryItemModal from "./modals/updateLibraryItemModal";
import DeleteLibraryItemModal from "./modals/deleteLibraryItemModal";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useState } from "react";
import { clsx } from "clsx";
import Content from "./content";
import AddFileForm from "./forms/addFileForm";
import AddToLibraryModal from "./modals/addToLibraryModal";
import UpdateFileForm from "./forms/updateFileForm";

type Props = {};

export default function LibraryList({}: Props) {
  const [mediaType, setMediaType] = useState("MUSIC");

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["libraries", mediaType],
    queryFn: () => getLibraryItems(mediaType),
    placeholderData: keepPreviousData,
  });

  const types = ["MUSIC", "VIDEO", "FILE"];

  if (isLoading) return <Loading />;
  if (error) return <p className="mt-10">Error fetching library items</p>;

  return (
    <section className="mt-6">
      <div className="w-full flex flex-wrap gap-2 items-center justify-between">
        <ButtonGroup className="bg-default rounded-lg px-[3px] transition-all duration-300 ">
          {types.map((type) => {
            return (
              <Button
                key={type}
                size="sm"
                className={clsx(
                  "my-[3px] hover:text-cultured/70 bg-transparent rounded-lg",
                  { "bg-forrestGreen !rounded-lg": type === mediaType }
                )}
                onClick={() => setMediaType(type)}
              >
                {type === "VIDEO" && <Video size={15} />}
                {type === "MUSIC" && <Music size={15} />}
                {type === "FILE" && <File size={15} />}
                {type}
                {type !== "MUSIC" && "S"}
              </Button>
            );
          })}
        </ButtonGroup>
        {mediaType === 'FILE' ? <AddFileForm /> : <AddToLibraryModal />}
      </div>
      {isFetching ? (
        <Loading />
      ) : (
        <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
          {data.items.map((library: LibraryItem) => {
            return library.type === "MUSIC" ? (
              <div
                key={library.id}
                className="p-4 w-full md:max-w-sm border shadow-md border-cultured/20 rounded-lg bg-forrestGreen"
              >
                <h2 className="capitalize mb-2">
                  {library.description.toLowerCase()}
                </h2>
                <audio className="" controls>
                  <source src={library.link} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <div className="flex gap-2 mt-4">
                  <UpdateLibraryItemModal libraryItem={library} />
                  <DeleteLibraryItemModal libraryItem={library} />
                </div>
              </div>
            ) : library.type === "VIDEO" ? (
              <div
                key={library.id}
                className="p-4 w-full md:max-w-sm border shadow bg-forrestGreen border-cultured/20 rounded-xl"
              >
                <h2 className="text-xl capitalize">{library.name}</h2>
                <p>{library.description}</p>
                <video controls>
                  <source src={library.link} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="flex gap-2 mt-4">
                  <UpdateLibraryItemModal libraryItem={library} />
                  <DeleteLibraryItemModal libraryItem={library} />
                </div>
              </div>
            ) : (
              <div
                key={library.id}
                className="p-4 w-full md:max-w-sm border shadow bg-forrestGreen border-cultured/20 rounded-xl"
              >
                <h2 className="text-xl capitalize">{library.name}</h2>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2">
                    <UpdateFileForm libraryItem={library} />
                    <DeleteLibraryItemModal libraryItem={library} />
                  </div>
                  <Content>{library.content}</Content>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
