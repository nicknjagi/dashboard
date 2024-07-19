"use client";

import { removeFromWorkspace } from "@/app/lib/workspaces";
import { Button } from "@nextui-org/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  accountId: string;
  workspaceDetails: {id:string;name:string;}
};

export default function RemoveFromWorkspace({ accountId, workspaceDetails }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => removeFromWorkspace(accountId, workspaceDetails.id),
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
