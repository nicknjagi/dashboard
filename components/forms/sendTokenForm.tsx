"use client";

import { sendEmail } from "@/app/lib/utils";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { FieldValues, useForm } from "react-hook-form";
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import toast from "react-hot-toast";

type Props = {
  onClose: any;
};

const EmailSchema = z.object({
  email: z.string().email()
})

const SendTokenForm: React.FC<Props> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState:{errors, isSubmitting},
    reset
  } = useForm({
    resolver: zodResolver(EmailSchema)
  })

  const onSubmit = async (data: FieldValues) => {
    try {
      await sendEmail(data.email);
      toast.success('Invite has been sent')
      reset()
      onClose()
    } catch (error) {
      console.error(error);
    } 
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {
          ...register('email')
        }
        type="email"
        variant={"underlined"}
        label="Email"
      />
      {errors.email && (
        <small className="mt-1 text-red-500">{`${errors.email.message}`}</small>
      )}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="sm"
          className="my-4 bg-cultured text-forrestGreen hover:bg-opacity-90 font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "please wait..." : "Send"}
        </Button>
      </div>
    </form>
  );
};

export default SendTokenForm;
