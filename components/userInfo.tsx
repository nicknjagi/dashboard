"use client";

import { getUserData } from "@/app/lib/users";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import { User } from "@nextui-org/user";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, CircleAlert } from "lucide-react";
import { useState } from "react";

export function UserInfo() {
  const [userId, setUserId] = useState("");
  const [submittedUserId, setSubmittedUserId] = useState("");

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["getUserData", submittedUserId],
    queryFn: () => getUserData(submittedUserId),
    enabled: !!submittedUserId, 
    refetchOnMount: true,
    staleTime: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedUserId(userId);
    if (submittedUserId === userId) {
      refetch();
    }
  };
console.log(data);

  return (
    <div>
      <form className="my-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          variant={"bordered"}
          classNames={{
            inputWrapper: "bg-forrestGreen border border-cultured/20 max-w-md",
          }}
          label="User ID"
          value={userId}
          onValueChange={setUserId}
        />
        <Button size="sm" className="btn mt-3" type="submit">Search</Button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}      
      {data?.user && (
        <div>
          <h1>User Data</h1>
          <div
            className="p-4 w-full md:max-w-sm border border-cultured/10 rounded-lg bg-forrestGreen"
          >
            <div className="flex items-center gap-4">
              <User
                avatarProps={{
                  radius: "lg",
                  src: data.user?.image_url
                    ? data.user?.image_url
                    : "/user-round.svg",
                }}
                description={data.user.email_addresses[0].email_address}
                name={`${data.user.first_name} ${data.user.last_name}`}
              >
                {data.user.email_addresses[0].email_address}
              </User>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
