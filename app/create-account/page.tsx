import CreateAccount from "@/components/forms/createAccountForm";
import { Suspense } from "react";

type Props = {};
export default function CreateAccountPage({}: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateAccount />
    </Suspense>
  );
}
