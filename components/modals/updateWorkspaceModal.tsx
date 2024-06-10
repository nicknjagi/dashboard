"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import UpdateWorkspaceForm from "../forms/updateWorkspaceForm";
import { Workspace } from "@/types";
import { Pencil } from "lucide-react";
import { Button } from "@nextui-org/button";

type Props = {
  workspace: Workspace;
};

export default function UpdateWorkspaceModal({ workspace }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        onClick={onOpen}
        variant="flat"
        className="bg-cultured text-forrestGreen font-semibold"
      >
        <span className="border-b border-forrestGreen">
          <Pencil size={15} />
        </span>
        <span>Edit</span>
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
                <UpdateWorkspaceForm onClose={onClose} workspace={workspace} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
