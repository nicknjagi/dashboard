"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useState } from "react";
import Toolbar from "../toolbar";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { Input, Textarea } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { FileLibrarySchema, TFileLibrarySchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLibraryItem } from "@/app/lib/library";
import toast from "react-hot-toast";

type Props = {};

const AddFileForm: React.FC<Props> = () => {
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFileLibrarySchema>({
    resolver: zodResolver(FileLibrarySchema),
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
    mutationFn: createLibraryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["libraries"] }); // Invalidate and refetch
      toast.success("Added to library successfully");
      reset();
      setContent('')
      editor?.commands.setContent('')
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
      ...data,
      content,
      type:'FILE'
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
        + New
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
                  className="flex flex-col gap-4"
                >
                  <div>
                    <Input
                      {...register("name")}
                      type="text"
                      variant={"underlined"}
                      classNames={{
                        inputWrapper: "border-b border-cultured/30",
                      }}
                      label="Title"
                    />
                    {errors.name && (
                      <small className="mt-1 ml-1 text-red-500">{`${errors.name.message}`}</small>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm mb-1">Content</h4>
                    <div className="rounded-lg bg-forrestGreen border border-cultured/20">
                      <Toolbar editor={editor} content={content} />
                      <EditorContent
                        style={{ whiteSpace: "pre-line" }}
                        editor={editor}
                        className="prose prose-invert max-w-full w-full"
                      />
                    </div>
                  </div>

                  <Textarea
                    {...register("content")}
                    variant="bordered"
                    label="Content"
                    value={content}
                    className="hidden"
                  />

                  <div className="w-fit ml-auto">
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-cultured text-forrestGreen hover:bg-opacity-90 font-medium"
                    >
                      {isSubmitting ? "please wait..." : "Submit"}
                    </Button>
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

export default AddFileForm;
