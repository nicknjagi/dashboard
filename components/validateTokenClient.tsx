"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircleCheck, Loader, TriangleAlert } from "lucide-react";

type Props = {};

const ValidateTokenClient = ({ }: Props) => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (email && token) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_URL}/api/validate-token?email=${email}&token=${token}`
        )
        .then((response) => {
          if (response.data.message !== "Invalid token") {
            router.push(`/create-account?email=${email}`);
          } else {
            setError("Invalid token");
          }
        })
        .catch(() => {
          setError("Invalid or expired token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Missing email or token");
      setLoading(false);
    }
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="flex w-full h-[calc(100vh-60px)] justify-center items-center">
        <div className="card p-6">
          <div className="flex gap-4 justify-center items-center">
            <div className="w-fit mx-auto animate-spin">
              <Loader size={36} />
            </div>
            <h1 className="text-xl">Validating token...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full h-[calc(100vh-60px)] justify-center items-center">
        <div className="card p-6">
          <div className="flex gap-2 items-end mb-1">
            <TriangleAlert size={36} />
            <h1 className="text-xl capitalize">{error}</h1>
          </div>
          <p>Contact admin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-[calc(100vh-60px)] justify-center items-center">
      <div className="card p-6">
        <div className="flex gap-4 justify-center items-center">
          <div className="w-fit mx-auto">
            <CircleCheck color="#1fb244" size={36} />
          </div>
          <h1 className="text-xl">Success. Redirecting...</h1>
        </div>
      </div>
    </div>
  );
};

export default ValidateTokenClient;
