"use client";

import { isClientResponseError, SignUpSchema, TSignUpSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { registerUser } from "@/app/lib/auth";

type Props = {};

export default function CreateAccount({}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  useEffect(() => {
    if (emailParam) {
      localStorage.setItem("email", emailParam);
    }
  }, [emailParam]);

  const onSubmit = async (data: TSignUpSchema) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("passwordConfirm", data.passwordConfirm);
    formData.append("accountType", data.accountType);

    // Handle file input separately
    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }
    
    if (data.email !== emailParam) {
      setError("email", {
        type: "client",
        message: "Use the email that received the invite",
      });
      return;
    }

    try {
      await registerUser(formData);
      reset();
      toast.success("Account created successfully. Redirecting to Login...");
      router.push("/login");
    } catch (error) {
      if (isClientResponseError(error)) {
        for (const item in error.response.data) {
          setError(item as keyof TSignUpSchema, {
            type: "server",
            message: error.response.data[item].message,
          });
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex w-full h-[calc(100vh-60px)] justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border-2 border-cultured/20 w-full max-w-2xl mx-auto px-4 py-6 sm:p-8 shadow-lg"
      >
        <div className="flex flex-col justify-center items-center w-full gap-2 mb-4 relative">
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
        <div className="mb-2">
          <h1 className="text-xl md:font-medium">Create an account</h1>
          <p className="text-sm text-neutral-400">
            Fill the form below to create your account
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Input
              {...register("firstName")}
              type="text"
              variant={"bordered"}
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: ["bg-inherit"],
                innerWrapper: "bg-inherit",
                inputWrapper: [
                  "bg-inherit",
                  "border-cultured/20",
                  "hover:disable:cursor-not-allowed",
                  "rounded-lg",
                ],
              }}
              label="First Name"
              labelPlacement="outside"
              placeholder="John"
            />
            {errors.firstName && (
              <small className="ml-3 text-red-500">{`${errors.firstName.message}`}</small>
            )}
          </div>
          <div>
            <Input
              {...register("lastName")}
              type="text"
              variant={"bordered"}
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: ["bg-inherit"],
                innerWrapper: "bg-inherit",
                inputWrapper: [
                  "bg-inherit",
                  "border-cultured/20",
                  "hover:disable:cursor-not-allowed",
                  "rounded-lg",
                ],
              }}
              label="Last Name"
              labelPlacement="outside"
              placeholder="Smith"
            />
            {errors.lastName && (
              <small className="ml-3 text-red-500">{`${errors.lastName.message}`}</small>
            )}
          </div>
        </div>
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
                "hover:disable:cursor-not-allowed",
                "rounded-lg",
              ],
            }}
            label="Email"
            labelPlacement="outside"
            placeholder="email@example.com"
          />
          {errors.email && (
            <small className="ml-3 text-red-500">{`${errors.email.message}`}</small>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
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
                  "rounded-lg",
                ],
              }}
              label="Password"
              labelPlacement="outside"
              placeholder="*********"
            />
            {errors.password && (
              <small className="ml-3 text-red-500">{`${errors.password.message}`}</small>
            )}
          </div>
          <div>
            <Input
              {...register("passwordConfirm")}
              type="password"
              variant={"bordered"}
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: ["bg-inherit"],
                innerWrapper: "bg-inherit",
                inputWrapper: [
                  "bg-inherit",
                  "border-cultured/20",
                  "rounded-lg",
                ],
              }}
              label="Confirm Password"
              labelPlacement="outside"
              placeholder="*********"
            />
            {errors.passwordConfirm && (
              <small className="ml-3 text-red-500">{`${errors.passwordConfirm.message}`}</small>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="avatar" className="text-sm">
            Profile Picture
          </label>
          <input
            {...register("avatar")}
            className="text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cultured file:text-forrestGreen hover:file:bg-cultured/80"
            type="file"
            name="avatar"
            id="avatar"
            />
            {errors.avatar && (
              <small className="ml-3 text-red-500">{`${errors.avatar.message}`}</small>
            )}
        </div>
        <Button
          type="submit"
          radius="sm"
          className="mt-2 bg-cultured text-forrestGreen hover:bg-opacity-90 font-medium uppercase"
          disabled={isSubmitting}
        >
          {isSubmitting ? "please wait..." : "Create"}
        </Button>
      </form>
    </div>
  );
}
