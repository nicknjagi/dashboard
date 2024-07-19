"use client";

import { Account } from "@/types";
import UserInfo from "./userInfo";

type Props = {
  accounts: [];
  workspaceId: string;
};

export default function WorkspaceUsers({ accounts, workspaceId }: Props) {
  return (
    <div className="mt-6 ">
      <h3 className="my-2 font-medium text-lg">Users</h3>
      <div className="flex flex-wrap gap-4">
        {accounts?.length > 0 ? (
          accounts.map((account: Account) => (
            <div
              key={account.id}
              className="flex p-4 pb-2 w-full min-w-[240px] md:max-w-sm card"
            >
              <UserInfo
                userId={account.userId}
                accountId={account.id}
                workspaceId={workspaceId}
              />
            </div>
          ))
        ) : (
          <p className="mt-2">No users to display.</p>
        )}
      </div>
    </div>
  );
}
