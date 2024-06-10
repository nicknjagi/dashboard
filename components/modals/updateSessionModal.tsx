"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Pencil } from "lucide-react";
import UpdateSessionForm from "../forms/updateSessionForm";
import { Session } from "@/types";

type Props = {
  session: Session;
};

export default function UpdateSessionModal({ session }: Props) {
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
                Update Session
              </ModalHeader>
              <ModalBody>
                <UpdateSessionForm session={session} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
