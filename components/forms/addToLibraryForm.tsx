"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { LibrarySchema, TLibrarySchema } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Select, SelectItem } from "@nextui-org/select";
import { Textarea } from "@nextui-org/input";
import { createLibraryItem } from "@/app/lib/library";

type Props = {
  onClose: () => void;
};

export const mediaTypes = [
  { key: "VIDEO", label: "VIDEO" },
  { key: "MUSIC", label: "MUSIC" },
  { key: "FILE", label: "FILE" },
];

const AddToLibraryForm: React.FC<Props> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLibrarySchema>({
    resolver: zodResolver(LibrarySchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createLibraryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["libraries"] }); // Invalidate and refetch
      toast.success("Added to library successfully");
      reset();
      onClose();
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data: TLibrarySchema) => {
    const libData = {
      ...data,
    };
    mutation.mutate(libData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 pt-2">
      <div>
        <Input
          {...register("name")}
          type="text"
          variant={"bordered"}
          classNames={{
            inputWrapper:"border border-cultured/30"
          }}
          label="Name"
        />
        {errors.name && (
          <small className="mt-1 ml-1 text-red-500">{`${errors.name.message}`}</small>
        )}
      </div>

      <div>
        <Input
          {...register("description")}
          type="text"
          variant={"bordered"}
          classNames={{
            inputWrapper:"border border-cultured/30"
          }}
          label="Description"
        />
        {errors.description && (
          <small className="mt-1 ml-1 text-red-500">{`${errors.description.message}`}</small>
        )}
      </div>

      <div>
        <Input
          {...register("link")}
          type="text"
          variant={"bordered"}
          classNames={{
            inputWrapper:"border border-cultured/30"
          }}
          label="Link"
        />
        {errors.link && (
          <small className="mt-1 ml-1 text-red-500">{`${errors.link.message}`}</small>
        )}
      </div>

      <div>
        <Select
          {...register("type")}
          items={mediaTypes}
          label="Type"
          className="block max-w-[160px]"
          classNames={{ popoverContent: ["bg-background"], trigger:"border border-cultured/30" }}
          variant="bordered"
        >
          {(type) => <SelectItem key={type.key}>{type.label}</SelectItem>}
        </Select>
        {errors.type && (
          <small className="mt-1 ml-1 text-red-500">{`${errors.type.message}`}</small>
        )}
      </div>

      <div>
        <Input
          {...register("thumbnail")}
          type="text"
          variant={"bordered"}
          classNames={{
            inputWrapper:"border border-cultured/30"
          }}
          label="Thumbnail"
        />
        {errors.thumbnail && (
          <small className="mt-1 ml-1 text-red-500">{`${errors.thumbnail.message}`}</small>
        )}
      </div>

      <div>
        <Textarea
          {...register("content")}
          variant="bordered"
          label="Content"
          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
          classNames={{
            inputWrapper:"border border-cultured/30"
          }}
        />
        {errors.content && (
          <small className="mt-1 ml-1 text-red-500">{`${errors.content.message}`}</small>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          size="sm"
          className="my-4 bg-cultured text-forrestGreen hover:bg-opacity-90 font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "please wait..." : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default AddToLibraryForm;
