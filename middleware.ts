import { NextRequest, NextResponse } from "next/server";

import { getUser } from "./services/auth";

const publicRoutes = [
  "/",
  "/pricing",
  "/login",
  "/api/get-covers",
  "/api/get-user-info",
  "/api/get-login-qrcode",
  "/api/check-login",
];

export default async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  if (
    !publicRoutes.includes(pathname) &&
    !pathname.startsWith("/cover") &&
    !pathname.startsWith("/pay-success")
  ) {
    const userToken = req.cookies.get("user-token");
    if (userToken && userToken.value) {
      const user = await getUser(userToken.value);
      if (user && user.uuid) {
        return NextResponse.next();
      }
    }

    // no auth
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { code: -2, message: "no auth" },
        { status: 401 }
      );
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
