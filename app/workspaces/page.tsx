import CreateWorkspaceModal from "@/components/modals/createWorkspaceModal"
import WorkspacesList from "@/components/workspacesList"

type Props = {}
export default function Workspaces({}: Props) {
  return (
    <div className="py-4">
      <div className="flex justify-between items-center">
        <h1 className={"text-xl md:text-2xl font-medium"}>Workspaces</h1>
        <CreateWorkspaceModal />
      </div>
      <WorkspacesList />
    </div>
  )
}