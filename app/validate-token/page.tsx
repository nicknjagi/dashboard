import { Suspense } from "react";
import Loading from "@/components/loading";
import ValidateTokenClient from "@/components/validateTokenClient";

type Props = {};

export default function ValidateToken({}: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <ValidateTokenClient />
    </Suspense>
  );
}
