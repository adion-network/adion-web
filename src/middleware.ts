import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export function middleware(request: NextRequest) {
  if (!cookies().has("user")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = { matcher: ["/node-provider/:path*"] }
