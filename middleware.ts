import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/pricing",
    "/covers/awesome",
    "/api/get-covers",
    "/api/get-user-info",
  ],

  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      if (auth.isApiRoute) {
        return NextResponse.json(
          { code: -2, message: "no auth" },
          { status: 401 }
        );
      } else {
        const url = new URL(req.url);
        if (
          !url.pathname.startsWith("/cover/") &&
          !url.pathname.startsWith("/user/")
        ) {
          return NextResponse.redirect(new URL("/sign-in", req.url));
        }
      }
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
