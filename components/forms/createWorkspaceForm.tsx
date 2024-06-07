"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { TWorkspaceSchema, WorkspaceSchema } from "@/types";
import { Checkbox } from "@nextui-org/checkbox";
import { createWorkspace } from "@/app/lib/workspaces";
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
  onClose: () => void;
};

const CreateWorkspaceForm: React.FC<Props> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TWorkspaceSchema>({
    resolver: zodResolver(WorkspaceSchema),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['workspaces']}); // Invalidate and refetch
      toast.success('Workspace created successfully');
      reset();
      onClose();
    },
    onError: (error: any) => {
      console.error(error);
      toast.error('Something went wrong');
    },
  });

  const onSubmit = (data: TWorkspaceSchema) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("name")}
        type="text"
        variant={"underlined"}
        label="Name"
      />
      {errors.name && (
        <small className="mt-1 ml-1 text-red-500">{`${errors.name.message}`}</small>
      )}

      <Checkbox
        {...register("active")}
        size="sm"
        className="block mt-2"
        defaultSelected
      >
        Active
      </Checkbox>

      <div className="flex justify-end">
        <Button
          type="submit"
          size="sm"
          className="my-4 bg-cultured text-forrestGreen hover:bg-opacity-90 font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "please wait..." : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default CreateWorkspaceForm;
