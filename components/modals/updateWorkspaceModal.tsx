"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import UpdateWorkspaceForm from "../forms/updateWorkspaceForm";
import { Workspace } from "@/types";

type Props = {
  workspace: Workspace;
}

export default function UpdateWorkspaceModal({workspace}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        onPress={onOpen}
        // className="bg-cultured text-forrestGreen hover:bg-opacity-90 font-medium"
        variant="light"
      >
        update
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
                Update Workspace
              </ModalHeader>
              <ModalBody>
                <UpdateWorkspaceForm onClose={onClose} workspace={workspace}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}