"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useState } from "react";
import Toolbar from "../toolbar";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { Input} from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { FileLibrarySchema, LibraryItem, TFileLibrarySchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLibraryItem } from "@/app/lib/library";
import toast from "react-hot-toast";

type Props = {
  libraryItem: LibraryItem;
};

const UpdateFileForm: React.FC<Props> = ({libraryItem}) => {
  const [content, setContent] = useState<string>(libraryItem.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LibraryItem>({
    resolver: zodResolver(FileLibrarySchema),
    defaultValues:{
      ...libraryItem
    }
  });

  const queryClient = useQueryClient();

  const editor = useEditor({
    extensions: [Underline, Image, StarterKit],
    editorProps: {
      attributes: {
        class: "outline-none px-2 sm:px-4 py-3 min-h-[200px]",
      },
    },
    onUpdate: ({ editor }) => {
      handleContentChange(editor.getHTML());
    },
    content
  });

  const mutation = useMutation({
    mutationFn: updateLibraryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["libraries"] }); // Invalidate and refetch
      toast.success("Changes have been saved");
      onClose()
      setIsSubmitting(false)
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Something went wrong");
      setIsSubmitting(false)
    },
  });

  const onSubmit = (data: TFileLibrarySchema) => {
    setIsSubmitting(true)
    const libData = {
      ...libraryItem,
      ...data,
      content,
    };
    mutation.mutate(libData);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <>
      <Button
        size="sm"
        onPress={onOpen}
        className="bg-cultured text-forrestGreen hover:bg-opacity-90 font-medium"
      >
        Update
      </Button>
      <Modal
        className="bg-forrestGreen py-8"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size="4xl"
        scrollBehavior="inside"
        isKeyboardDismissDisabled={true}
        placement="top-center"
      >
        <ModalContent>
          {() => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1 pb-0">
                add
              </ModalHeader> */}
              <ModalBody className="py-0">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
                  {/* name */}
                  <div>
                    <Input
                      {...register("Name")}
                      type="text"
                      variant={"underlined"}
                      classNames={{
                        inputWrapper: "border-b border-cultured/30",
                      }}
                      label="Title"
                    />
                    {errors.Name && (
                      <small className="mt-1 ml-1 text-red-500">{`${errors.Name.message}`}</small>
                    )}
                  </div>
                  {/* description */}
                  <div>
                    <Input
                      {...register("description")}
                      type="text"
                      variant={"underlined"}
                      classNames={{
                        inputWrapper: "border-b border-cultured/30",
                      }}
                      label="Description"
                    />
                    {errors.description && (
                      <small className="mt-1 ml-1 text-red-500">{`${errors.description.message}`}</small>
                    )}
                  </div>
                    {/* content */}
                  <div>
                    <h4 className="text-sm mt-4 mb-1">Content</h4>
                    <div className="rounded-lg bg-forrestGreen border border-cultured/20">
                      <Toolbar editor={editor} content={content} isSubmitting={isSubmitting}/>
                      <EditorContent
                        style={{ whiteSpace: "pre-line" }}
                        editor={editor}
                        className="prose prose-invert max-w-full w-full"
                      />
                    </div>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateFileForm;
