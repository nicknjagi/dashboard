"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import CreateWorkspaceForm from "../forms/createWorkspaceForm";

type Props = {}

export default function CreateWorkspaceModal({}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        onPress={onOpen}
        className="bg-cultured text-forrestGreen hover:bg-opacity-90 font-medium"
      >
        + create
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
                Create Workspace
              </ModalHeader>
              <ModalBody>
                <CreateWorkspaceForm onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}