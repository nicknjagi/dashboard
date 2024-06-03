import CreateAccount from "@/components/forms/createAccount";
import { Suspense } from "react";

type Props = {};
export default function CreateAccountPage({}: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateAccount />
    </Suspense>
  );
}
