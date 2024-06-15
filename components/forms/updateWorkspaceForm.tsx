"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { TWorkspaceSchema, User, Workspace, WorkspaceSchema } from "@/types";
import { Checkbox } from "@nextui-org/checkbox";
import { updateWorkspace } from "@/app/lib/workspaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {Select, SelectItem} from "@nextui-org/select";
import { fetchAllFacilitators } from "@/app/lib/facilitators";
import Loading from "../loading";

type Props = {
  workspace: Workspace;
  onClose: () => void;
};

const UpdateWorkspaceForm: React.FC<Props> = ({ workspace, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Workspace>({
    resolver: zodResolver(WorkspaceSchema),
    defaultValues: workspace
      ? {
          name: workspace.name,
          active: workspace.active,
          facilitator: workspace.facilitator
        }
      : {},
  });
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["facilitators"],
    queryFn: fetchAllFacilitators,
  });

  const mutation = useMutation({
    mutationFn: updateWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] }); // Invalidate and refetch
      toast.success("Workspace updated successfully");
      reset();
      onClose();
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data: TWorkspaceSchema) => {
    const updatedWorkspace = {
      ...workspace,
      ...data,
    };
    mutation.mutate(updatedWorkspace);
  };

  if (isLoading) {
    return <Loading />;
  }

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

      <Select
        {...register("facilitator")}
        items={data.items}
        label="Facilitator"
        className="block max-w-[160px]"
        classNames={{ popoverContent: ["bg-background"] }}
        variant="underlined"
      >
        {(facilitator: User) => (
          <SelectItem key={facilitator.id}>{facilitator.name}</SelectItem>
        )}
      </Select>

      <Checkbox
        {...register("active")}
        size="sm"
        className="block mt-2"
        defaultSelected={workspace.active}
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
          {isSubmitting ? "please wait..." : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateWorkspaceForm;
