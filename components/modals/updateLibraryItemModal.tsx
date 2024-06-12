"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import UpdateLibraryItemForm from "../forms/updateLibraryItemForm";
import { LibraryItem } from "@/types";
import { Pencil } from "lucide-react";

type Props = {
  libraryItem: LibraryItem
};

export default function UpdateLibraryItemModal({libraryItem}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        onPress={onOpen}
        className="bg-cultured text-forrestGreen hover:bg-opacity-90 font-medium"
      >
        <span className="border-b border-forrestGreen">
          <Pencil size={15} />
        </span>
        Edit
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
              <ModalHeader className="flex flex-col gap-1 pb-0">
                Edit Library item
              </ModalHeader>
              <ModalBody>
                <UpdateLibraryItemForm libraryItem={libraryItem} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
