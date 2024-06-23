import { auth } from "auth"

export const GET = auth((req) => {
  const { accessToken }: any = req.auth
  if (req.auth) {
    return Response.json({ ...req.auth})
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 })
}) 
