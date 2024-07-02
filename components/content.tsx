"use client";

import parse from "html-react-parser";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/modal";
import React from "react";
import { LibraryItem } from "@/types";

type Props = {
  children: string;
  libraryItem:LibraryItem
};

export default function Content({ children, libraryItem }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        onPress={onOpen}
        variant="flat"
        className="text-sky-200"      >
        View
      </Button>
      <Modal
        className="bg-forrestGreen"
        classNames={{
          base:'my-4',
          wrapper:' h-full max-h-screen overflow-y-auto'
        }}
        isOpen={isOpen}
        size="4xl"
        onOpenChange={onOpenChange}
        isDismissable={false}
        scrollBehavior="inside"
        isKeyboardDismissDisabled={true}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-xl font-semibold capitalize">{libraryItem.Name}</h2>
              </ModalHeader>
              <ModalBody className="prose prose-invert max-w-full w-full">{parse(children)}</ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
