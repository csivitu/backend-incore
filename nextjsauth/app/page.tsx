import CustomLink from "@/components/custom-link"
import { auth } from "auth"

export default async function Index() {
  const session = await auth()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">CSI Backend Example</h1>
      <div>
       This is an example of how to use next-auth's authentication.
      </div>  
      <div className="flex flex-col bg-neutral-700 rounded-xl">
        <div className="p-4 font-bold bg-neutral-900 rounded-t-xl">
          Current Session
        </div>
        <pre className="py-6 px-4 whitespace-pre-wrap break-all">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  )
}
