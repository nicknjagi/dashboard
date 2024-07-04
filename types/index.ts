import { ClientResponseError } from "pocketbase";
import { SVGProps } from "react";
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
  message: "Passwords must match",
  path: ["passwordConfirm"]
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

export interface ClerkUser {
  id: string;
  object: string;
  username: string | null;
  first_name: string;
  last_name: string;
  image_url: string;
  has_image: boolean;
  primary_email_address_id: string;
  primary_phone_number_id: string | null;
  primary_web3_wallet_id: string | null;
  password_enabled: boolean;
  two_factor_enabled: boolean;
  totp_enabled: boolean;
  backup_code_enabled: boolean;
  email_addresses: EmailAddress[];
  phone_numbers: any[]; 
  web3_wallets: any[]; 
  passkeys: any[]; 
  external_accounts: ExternalAccount[];
  saml_accounts: any[]; 
  public_metadata: Record<string, any>;
  private_metadata: Record<string, any>;
  unsafe_metadata: Record<string, any>;
  external_id: string | null;
  last_sign_in_at: number;
  banned: boolean;
  locked: boolean;
  lockout_expires_in_seconds: number | null;
  verification_attempts_remaining: number;
  created_at: number;
  updated_at: number;
  delete_self_enabled: boolean;
  create_organization_enabled: boolean;
  last_active_at: number;
  mfa_enabled_at: number | null;
  mfa_disabled_at: number | null;
  profile_image_url: string;
}

interface EmailAddress {
  id: string;
  object: string;
  email_address: string;
  reserved: boolean;
  created_at: number;
  updated_at: number;
}

export interface EmailVerification {
  status: string;
  strategy: string;
  attempts: number | null;
  expire_at: number | null;
}

export interface LinkedAccount {
  type: string;
  id: string;
}


export interface ExternalAccountVerification {
  status: string;
  strategy: string;
  attempts: number | null;
  expire_at: number | null;
  error: ExternalAccountError;
}

export interface ExternalAccountError {
  code: string;
  message: string;
  long_message: string;
}

export interface ExternalAccount {
  object: string;
  id: string;
  google_id: string;
  approved_scopes: string;
  email_address: string;
  given_name: string;
  family_name: string;
  picture: string;
  username: string | null;
  public_metadata: Record<string, any>;
  label: string | null;
  created_at: number;
  updated_at: number;
  verification: ExternalAccountVerification;
}

export type Account = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  userId: string;
  active: boolean;
  subscription_type: 'STUDENT' | 'PRODUCTIVITY' | 'BLENDED'
  valid_until: string; // ISO 8601 date string
  workspace_theme: string; // Assuming this is a relation record ID
  sub_code: string;
};

export const AccountSchema = z.object({
  subscription_type: z.string().min(2, "Subscription type is required"),
  active: z.boolean().default(false),
})

export const LibrarySchema = z.object({
  Name: z.string().min(2, "Name is required"),
  description: z.string(),
  type: z.string().min(2, "Please choose a type"),
  link: z.string(),
  thumbnail: z.string(),
})

export type TLibrarySchema = z.infer<typeof LibrarySchema>

export const FileLibrarySchema = z.object({
  Name: z.string().min(2, "Title is required"),
  description: z.string(),
  content: z.string(),
})

export type TFileLibrarySchema = z.infer<typeof FileLibrarySchema>

export type LibraryItem = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  Name: string;
  description: string;
  link: string;
  type: 'VIDEO' | 'MUSIC' | 'FILE'
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