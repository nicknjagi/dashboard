"use client";

import { deleteWorkspace } from "@/app/lib/workspaces";
import { Workspace } from "@/types";
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
  workspace: Workspace;
};

export default function DeleteWorkspaceModal({ workspace }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] }); // Invalidate and refetch
      toast.success("Workspace deleted successfully");
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
                  Are you sure you want to delete workspace{" "}
                  <span className="bg-default-100 px-1 rounded">
                    {workspace.name}
                  </span>
                  ?
                </h2>
              </ModalHeader>
              <ModalBody>
                <p>This action is not reversible.</p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Cancel</Button>
                <Button
                  onClick={() => mutation.mutate(workspace.id)}
                  color="danger"
                >
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
