import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token && req.nextUrl.pathname !== "/auth/login") {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
  if (token && (req.nextUrl.pathname === "/auth/login" || req.nextUrl.pathname === "/")) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/login"],
};
