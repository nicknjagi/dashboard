import UserInfo from "@/components/userInfo";

type Props = {};

export default function Users({}: Props) {
  return (
    <section className="py-2">
      <div className="flex justify-between items-center">
        <h1 className={"text-xl md:text-2xl font-medium"}>Search user</h1>
      </div>
      <UserInfo />
    </section>
  );
}
