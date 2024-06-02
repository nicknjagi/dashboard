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
  identity: z.string().email(),
  password: z.string().min(1, { message: "Password is required" })
})

export type TLoginSchema = z.infer<typeof LoginSchema>

export function isClientResponseError(error: unknown): error is ClientResponseError {
  return error instanceof ClientResponseError;
}

export type User = {
  id: string;
  collectionId: string;
  collectionName: string;
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  name: string;
  avatar: string;
  AccountType: 'ADMIN' | 'FACILITATOR'
};

export type Account = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  userId: string;
  active: boolean;
  subscription_type: 'STUDENT' | 'PRODUCTIVITY'| 'BLENDED'
  valid_until: string; // ISO 8601 date string
  workspace_theme: string; // Assuming this is a relation record ID
  sub_code: string;
};

export type LibraryItem = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  Name: string;
  description: string;
  link: string;
  type: 'VIDEO' | 'MUSIC'| 'FILE'
  thumbnail: string;
  content: string; // Assuming this is rich text format
};

export type Workspace = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  name: string;
  active: boolean;
  users: string[]; // Array of account relation record IDs
  facilitator: string; // Single relation record ID
};

export type Session = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  workspace: string; // Relation record ID
  date: string; // ISO 8601 date string
  type: 'MEETING' | 'DEEP_FOCUS' | 'NETWORKING' | 'LESSON' | 'COLLABORATION' | 'PUBLIC';
  link_to_session: string;
  duration_in_hours: number;
}