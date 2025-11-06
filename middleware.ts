import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;

      // Public routes: allow without auth
      const publicPaths = ["/", "/login", "/api/auth", "/_next", "/public"];
      if (publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
        return true;
      }

      // If no token and not public, block
      if (!token) return false;

      const role = (token as any).role as string | undefined;

      // Role-gated areas
      if (pathname.startsWith("/lecturer")) return role === "lecturer";
      if (pathname.startsWith("/student")) return role === "student" || role === "lecturer";

      // Generic protected area
      if (pathname.startsWith("/dashboard")) return true;

      return true;
    },
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/lecturer/:path*",
    "/student/:path*",
  ],
};


