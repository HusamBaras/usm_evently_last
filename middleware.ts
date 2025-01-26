import { clerkMiddleware } from "@clerk/nextjs/server";

console.log("Middleware loaded");

export default clerkMiddleware();

export const config = {
  matcher: [
    /**
     * Exclude the /register route and its subroutes
     * while still applying middleware to other routes.
     */
    '/((?!register).*)', // Exclude /register and its subroutes
    '/(api|trpc)(.*)',   // Always apply to API routes
  ],
};
