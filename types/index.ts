import { ClientResponseError } from "pocketbase";
import {SVGProps} from "react";
import { z } from "zod";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const SignUpSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  passwordConfirm: z.string(),
  accountType: z.string().default("FACILITATOR"),
  avatar: z.optional(z.any())
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

export const AccountSchema = z.object({
  subscription_type: z.string().min(1, "Subscription type is required"),
  active: z.boolean().default(false),
})

export type LibraryItem = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  name: string;
  description: string;
  link: string;
  type: 'VIDEO' | 'MUSIC'| 'FILE'
  thumbnail: string;
  content: string; // Assuming this is rich text format
};

export const WorkspaceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  active: z.boolean().default(true),
  facilitator: z.string()
})

export type TWorkspaceSchema = z.infer<typeof WorkspaceSchema>

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

export const SessionSchema = z.object({
  date: z.string().min(1, "Date is required"),
  workspace: z.string().min(1, "Workspace is required"),
  type: z.string().min(1, "Type is required"),
  link_to_session: z.string().min(1, "Link to session is required"),
  duration_in_hours: z.coerce.number().min(1, "Duration must be at least 1 hour")
});

export type TSessionSchema = z.infer<typeof SessionSchema>

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