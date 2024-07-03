"use client";

import { deleteLibraryItem } from "@/app/lib/library";
import { LibraryItem } from "@/types";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  libraryItem: LibraryItem;
};

export default function DeleteLibraryItemModal({ libraryItem }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteLibraryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["libraries"] }); // Invalidate and refetch
      toast.success("Library item deleted successfully");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Something went wrong");
    },
  });

  return (
    <>
      <Button size="sm" onClick={onOpen} color="danger" variant="flat">
        <Trash2 size={16} />
        <span>Delete</span>
      </Button>
      <Modal
        className="bg-forrestGreen"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-xl">
                  Are you sure you want to delete {libraryItem.Name}?
                </h2>
              </ModalHeader>
              <ModalBody>
                <p>This action is not reversible.</p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Cancel</Button>
                <Button onClick={() => mutation.mutate(libraryItem.id)} color="danger">
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
