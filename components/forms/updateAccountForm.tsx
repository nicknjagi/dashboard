"use client";

import { Button } from "@nextui-org/button";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Account, AccountSchema } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Select, SelectItem } from "@nextui-org/select";
import { Checkbox } from "@nextui-org/checkbox";
import { updateAccount } from "@/app/lib/accounts";

type Props = {
  account: Account;
  onClose: () => void;
};

const UpdateAccountForm: React.FC<Props> = ({ account, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      ...account,
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] }); // Invalidate and refetch
      toast.success("Account updated successfully");
      reset();
      onClose();
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Something went wrong");
    },
  });

  const sessionTypes = [
    { key: "STUDENT", label: "STUDENT" },
    { key: "PRODUCTIVITY", label: "PRODUCTIVITY" },
    { key: "BLENDED", label: "BLENDED" },
  ];

  const onSubmit = (data: FieldValues) => {
    const accountData = {
      ...account,
      ...data
    };
    mutation.mutate(accountData as Account);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select
        {...register("subscription_type")}
        items={sessionTypes}
        label="Subscription Type"
        className="block max-w-[160px]"
        classNames={{ popoverContent: ["bg-background"] }}
        variant="underlined"
      >
        {(type) => <SelectItem key={type.key}>{type.label}</SelectItem>}
      </Select>
      {errors.subscription_type && (
        <small className="mt-1 ml-1 text-red-500">{`${errors.subscription_type.message}`}</small>
      )}
      <Checkbox
        {...register("active")}
        size="sm"
        className="block mt-2"
        defaultSelected={account.active}
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
          {isSubmitting ? "please wait..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateAccountForm;
