"use client";

import { addToWorkspace, getWorkspaceNames } from "@/app/lib/workspaces";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../loading";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {
  accountId: string;
};

type AddToWorkspaceInput = {
  accountId: string;
  workspaceId: string;
};

export default function AddToWorkspaceModal({ accountId }: Props) {
  const [workspaceId, setWorkspaceId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data, error, isLoading } = useQuery({
    queryKey: ["workspaceNames"],
    queryFn: getWorkspaceNames,
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ accountId, workspaceId }: AddToWorkspaceInput) =>
      addToWorkspace(accountId, workspaceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaceForAccount"] });
      // toast.success("Added to workspace successfully");
      setIsSubmitting(false);
      onClose();
    },
    onError: (error: any) => {
      let errorMessage = "Something went wrong";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage =
          error.response.data.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }
      console.error(errorMessage);
      toast.error(errorMessage);
      setIsSubmitting(false);
    },
  });

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWorkspaceId(e.target.value);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    mutation.mutate({ accountId, workspaceId });
  }

  return (
    <>
      <Button
        size="sm"
        onClick={onOpen}
        variant="bordered"
        className="p-0 border-0  text-cultured/70 hover:text-cultured/100"
      >
        + Add to workspace
      </Button>
      <Modal
        className="bg-forrestGreen"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement="top-center"
      >
        <ModalContent className="py-4">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pb-4">
                Add to workspace
              </ModalHeader>
              <ModalBody>
                {isLoading && <Loading />}
                {error && <p>Something went wrong.</p>}
                <form onSubmit={handleSubmit} className="flex gap-4 items-end">
                  <Select
                    isRequired
                    items={data?.items}
                    label="Choose workspace"
                    className="block max-w-[200px]"
                    classNames={{
                      popoverContent: ["bg-background"],
                      trigger: "border border-cultured/30",
                    }}
                    variant="bordered"
                    size="sm"
                    onChange={handleSelectionChange}
                  >
                    {(item: { id: string; name: string }) => (
                      <SelectItem key={item.id}>{item.name}</SelectItem>
                    )}
                  </Select>
                  <Button
                    type="submit"
                    size="lg"
                    className="btn"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? "adding..." : "+ Add"}
                  </Button>
                </form>
                {data?.items && <div></div>}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
