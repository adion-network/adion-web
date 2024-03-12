"use server"
import { cookies } from "next/headers"
import { permanentRedirect } from "next/navigation"

export async function GET(req: Request) {
  cookies().delete("user")
  permanentRedirect("/login")
}
