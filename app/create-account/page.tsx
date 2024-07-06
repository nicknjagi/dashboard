import CreateAccount from "@/components/forms/createAccountForm";
import Loading from "@/components/loading";
import { Suspense } from "react";

type Props = {};
export default function CreateAccountPage({}: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <CreateAccount />
    </Suspense>
  );
}
