import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

export default function customMiddleware(req: NextRequest, event: NextFetchEvent) {
  const publicRoutes = ["/", "/register", "/api/health"]; // Define public routes
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

  // Allow public routes without authentication
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Use Clerk's middleware for all other routes
  return clerkMiddleware()(req, event);
}

export const config = {
  matcher: [
    "/((?!register).*)", // Exclude /register and its subroutes
    "/(api|trpc)(.*)",   // Always apply to API routes
  ],
};
