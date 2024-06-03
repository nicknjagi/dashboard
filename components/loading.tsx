import { Loader } from "lucide-react"

type Props = {}
export default function Loading({}: Props) {
  return (
    <div className="w-fit mt-8 mx-auto animate-spin">
      <Loader size={36} />
    </div>
  )
}