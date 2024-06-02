import { ClientResponseError } from "pocketbase";
import {SVGProps} from "react";
import { z } from "zod";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
  passwordConfirm: z.string()
}).refine(data => data.password === data.passwordConfirm, {
  message:"Passwords must match",
  path:["passwordConfirm"]
})

export type TSignUpSchema = z.infer<typeof SignUpSchema>

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" })
})

export type TLoginSchema = z.infer<typeof LoginSchema>

export function isClientResponseError(error: unknown): error is ClientResponseError {
  return error instanceof ClientResponseError;
}