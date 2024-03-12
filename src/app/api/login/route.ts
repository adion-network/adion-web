"use server"

import { ResData } from "../request"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    const userList = process.env.USER_LIST?.split("|")
    const { password, username } = await req.json()

    if (userList?.includes(username + "," + password)) {
      cookies().set("user", username)
      return Response.json({ msg: "Logged in", code: 200, data: {} } as ResData)
    } else {
      throw new Error("Invalid credentials")
    }
  } catch (error: any) {
    return Response.json({ msg: error.message, code: 403, data: {} } as ResData)
  }
}

export async function GET(req: Request) {
  try {
    if (!cookies().has("user")) {
      throw new Error("not login")
    }
    const user = cookies().get("user")
    return Response.json({ msg: "OK", code: 200, data: { username: user?.value } } as ResData)
  } catch (error: any) {
    return Response.json({ msg: error.message, code: 400, data: {} } as ResData)
  }
}
