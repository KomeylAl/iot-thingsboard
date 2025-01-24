import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
   const token = req.cookies.get('token');
   if (!token && req.nextUrl.pathname !== '/auth/login') {
      const loginUrl = new URL('/auth/login', req.url);
      return NextResponse.redirect(loginUrl);
   }
   if (token && req.nextUrl.pathname === '/auth/login') {
      const loginUrl = new URL('/', req.url);
      return NextResponse.redirect(loginUrl);
   }
   return NextResponse.next();
}
export const config = {
   matcher: ["/", "/auth/login"],
}