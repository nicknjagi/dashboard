"use client";

import { getUserData } from "@/app/lib/users";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function UserInfo() {
  const [userId, setUserId] = useState("");
  const [submittedUserId, setSubmittedUserId] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: ["getUserData", submittedUserId],
    queryFn: () => getUserData(submittedUserId),
    enabled: !!submittedUserId, 
    refetchOnMount: true,
    staleTime: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedUserId(userId);
    console.log(userId);
    
  };

  return (
    <div>
      <form className="my-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          variant={"bordered"}
          classNames={{
            inputWrapper: "border-b border-cultured/30 max-w-md",
          }}
          label="User ID"
          value={userId}
          onValueChange={setUserId}
        />
        <Button size="sm" className="btn mt-2" type="submit">Search</Button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h1>User Data</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
