"use client";

import { removeFromWorkspace } from "@/app/lib/workspaces";
import { Button } from "@nextui-org/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  accountId: string;
};

export default function RemoveFromWorkspace({ accountId }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const {id: workspaceId} = useParams()

  const mutation = useMutation({
    mutationFn: () => removeFromWorkspace(accountId, workspaceId as string),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["workspaceForAccount"]}),
      queryClient.invalidateQueries({queryKey: ["getWorkspace"]})
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      console.error("Error removing user from workspace:", error);
      toast.error("Failed to remove user from workspace");
      setIsSubmitting(false);
    }
  });

  const handleRemove = () => {
    setIsSubmitting(true);
    mutation.mutate();
  };

  return (
    <>
      <Button
        size="sm"
        variant="bordered"
        className="p-0 border-0  text-cultured/70 hover:text-cultured/100"
        onClick={handleRemove}
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        {isSubmitting ? "removing from workspace..." : `Remove from workspace`}
      </Button>
    </>
  );
}
