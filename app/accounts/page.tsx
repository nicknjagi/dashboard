import AccountsList from "@/components/accountsList"

type Props = {}
export default function Accounts({}: Props) {
  return (
    <div className="py-2">
      <div className="flex justify-between items-center">
      <div className="flex items-end gap-2">
          <h1 className={"text-xl md:text-2xl font-medium"}>Accounts</h1>
      </div>
      </div>
      <AccountsList />
    </div>
  )
}