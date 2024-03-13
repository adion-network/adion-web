"use server"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    cookies().delete("user")
    return Response.json({ msg: "", code: 200, data: {} })
  } catch (error: any) {
    return Response.json({ msg: error.message, code: 400, data: {} })
  }
}
