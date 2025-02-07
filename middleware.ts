import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const role = req.cookies.get("role")?.value;

  // اگر توکن اصلی وجود ندارد و کاربر در مسیر لاگین نیست، ریدایرکت شود
  if (!token && req.nextUrl.pathname !== "/auth/login") {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // اگر کاربر لاگین کرده و به صفحه لاگین یا روت می‌رود، به داشبورد هدایت شود
  if (token && (req.nextUrl.pathname === "/auth/login" || req.nextUrl.pathname === "/")) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // بررسی انقضای توکن (اگر توکن معتبر است)
  if (token) {
    try {
      const decoded = jwt.decode(token) as JwtPayload | null;

      // اگر توکن منقضی شده است
      if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
        if (refreshToken) {
          // درخواست برای دریافت توکن جدید
          const response = await fetch(`${process.env.THINGSBOARD_URL}/api/auth/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
          });

          if (response.ok) {
            const { token: newToken, refreshToken: newRefreshToken } = await response.json();

            // ذخیره توکن‌های جدید در کوکی
            const res = NextResponse.next();
            res.cookies.set("token", newToken, { httpOnly: true, path: "/", maxAge: 3600 }); // توکن جدید
            res.cookies.set("refreshToken", newRefreshToken, { httpOnly: true, path: "/", maxAge: 7 * 24 * 3600 }); // رفرش توکن جدید

            return res;
          } else {
            // در صورت خطای دریافت توکن جدید، به لاگین ریدایرکت شود
            const loginUrl = new URL("/auth/login", req.url);
            return NextResponse.redirect(loginUrl);
          }
        } else {
          // اگر رفرش توکن موجود نیست، به لاگین ریدایرکت شود
          const loginUrl = new URL("/auth/login", req.url);
          return NextResponse.redirect(loginUrl);
        }
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      // در صورت خطای بررسی توکن، به لاگین ریدایرکت شود
      const loginUrl = new URL("/auth/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (role === "SYS_ADMIN") {
    // اجازه دسترسی به /sysadmin فقط برای SYS_ADMIN
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      const dashboardUrl = new URL("/sysadmin", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  if (role === "TENANT_ADMIN") {
    // اجازه دسترسی به /dashboard فقط برای TENANT_ADMIN
    if (req.nextUrl.pathname.startsWith("/sysadmin")) {
      const sysadminUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(sysadminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/sysadmin/:path*", "/auth/login"],
};
