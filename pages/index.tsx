import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/register");
  }, [router]);

  return null; // This renders nothing as it redirects immediately.
}
