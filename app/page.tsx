import ActiveUsersCountCard from "@/components/activeUsersCountCard";
import WorkspacesCountCard from "@/components/workspacesCountCard";

export default function Home() {
  return (
    <section className="">
      <h1 className={"text-xl md:text-2xl font-medium mb-6"}>Dashboard</h1>
      <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-6">
        <WorkspacesCountCard />
        <ActiveUsersCountCard />
      </div>
    </section>
  );
}
