import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";

export default function IndexPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth(); // Clerk's authentication status

  useEffect(() => {
    if (isSignedIn && router.pathname !== "/home") {
      router.push("/home"); // Redirect to home if authenticated and not already on /home
    } else if (!isSignedIn && router.pathname !== "/login") {
      router.push("/login"); // Redirect to login if not authenticated and not already on /login
    }
  }, [isSignedIn, router]);

  return null; // Render nothing as it redirects immediately
}
