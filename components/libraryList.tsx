"use client";

import { LibraryItem } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Loading from "./loading";
import { getLibraryItems } from "@/app/lib/library";
import { File, Music, Video } from "lucide-react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useState } from "react";
import { clsx } from "clsx";
import AddFileForm from "./forms/addFileForm";
import AddToLibraryModal from "./modals/addToLibraryModal";
import { Pagination } from "@nextui-org/pagination";
import FileItem from "./fileItem";
import VideoItem from "./videoItem";
import MusicItem from "./musicItem";

type Props = {};

export default function LibraryList({}: Props) {
  const [mediaType, setMediaType] = useState("MUSIC");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["libraries", mediaType, page],
    queryFn: () => getLibraryItems(mediaType, page, perPage),
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
                onClick={() => {
                  setMediaType(type);
                  setPage(1);
                }}
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
        {mediaType === "FILE" ? <AddFileForm /> : <AddToLibraryModal />}
      </div>
      {isFetching ? (
        <Loading />
      ) : (
        <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
          {data.items.map((libraryItem: LibraryItem) => {
            return libraryItem.type === "MUSIC" ? (
              <MusicItem key={libraryItem.id} libraryItem={libraryItem} />
            ) : libraryItem.type === "VIDEO" ? (
              <VideoItem key={libraryItem.id} libraryItem={libraryItem} />
            ) : (
              <FileItem key={libraryItem.id} libraryItem={libraryItem} />
            );
          })}
        </div>
      )}
      {((data?.totalItems > 10 && mediaType !== 'FILE') || (data?.totalItems > 6 && mediaType === 'FILE')) && <div className="w-full mt-6">
        <Pagination
          isCompact
          showControls
          page={page}
          total={data.totalPages}
          onChange={setPage}
          classNames={{
            cursor:
              "bg-forrestGreen border border-cultured/20 text-white font-bold",
          }}
        />
      </div>}
    </section>
  );
}
