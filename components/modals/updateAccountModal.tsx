"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Account} from "@/types";
import UpdateAccountForm from "../forms/updateAccountForm";

type Props = {
  account: Account;
};

export default function UpdateAccountModal({ account }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        onClick={onOpen}
        variant="light"
      >
        <span>update</span>
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
                Update Account
              </ModalHeader>
              <ModalBody>
                <UpdateAccountForm account={account} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}