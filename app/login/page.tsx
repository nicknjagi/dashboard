'use client'

import { LoginSchema, TLoginSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { useForm } from "react-hook-form";
import { loginUser } from "../lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { clsx } from "clsx";

type Props = {}

export default function Login({}: Props) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver:zodResolver(LoginSchema)
  })

  const onSubmit = async (data: TLoginSchema) => {
    try {
      await loginUser(data)
      toast.success('Success. Redirecting to Dashboard...')
      router.push('/')
    } catch (error) {     
      toast.error('Invalid credentials')
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] items-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border-2 border-cultured/20 rounded-lg w-full max-w-lg mx-auto p-4 sm:p-8 shadow-lg"
      >
        <div className="flex flex-col justify-center items-center w-full gap-2 mb-1 sm:mb-4 relative">
          <Image
            src="/logo.png"
            width={35}
            height={35}
            className={clsx({ "mx-auto": true })}
            alt="logo"
          />
          <h2 className="uppercase leading-4 ">
            my mind <span className="font-semibold text-gold">capsule</span>
          </h2>
        </div>
        <h1 className="text-xl md:font-medium mb-2">Login</h1>
        <div>
          <Input
            {...register("email")}
            type="email"
            variant={"bordered"}
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: ["bg-inherit"],
              innerWrapper: "bg-inherit",
              inputWrapper: [
                "bg-inherit",
                "border-cultured/20",
                "hover:disable:cursor-not-allowed"
              ],
            }}
            label="Email"
            placeholder="email@example.com"
          />
          {errors.email && (
            <small className="ml-3 text-red-500">{`${errors.email.message}`}</small>
          )}
        </div>
        <div>
          <Input
            {...register("password")}
            type="password"
            variant={"bordered"}
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: ["bg-inherit"],
              innerWrapper: "bg-inherit",
              inputWrapper: [
                "bg-inherit",
                "border-cultured/20",
              ],
            }}
            label="Password"
            placeholder="*********"
          />
          {errors.password && (
            <small className="ml-3 text-red-500">{`${errors.password.message}`}</small>
          )}
        </div>
        
        <Button
          type="submit"
          radius="sm"
          className="mt-2 bg-cultured text-forrestGreen hover:bg-opacity-90 font-medium uppercase"
          disabled={isSubmitting}
        >
          {isSubmitting ? "please wait..." : "Login"}
        </Button>
      </form>
    </div>
  )
}