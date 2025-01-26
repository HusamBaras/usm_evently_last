import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter(); // Get the current route

  // Dynamic Header Styles Based on Page
  const headerStyles: Record<string, string> = {
    "/home": "bg-usmPurple text-white",
    "/profile": "bg-gold text-usmPurple",
    "/payment": "bg-yellow-500 text-black",
    "/events": "bg-gray-800 text-white",
  };

  // Safely access the style or fall back to the default (keep `/register` as default purple)
  const currentStyle = headerStyles[router.pathname] || "bg-usmPurple text-white";

  // Page-specific header elements
  const renderHeaderElements = () => {
    if (router.pathname === "/register") {
      // Keep the register page clean, only show logo and name
      return null;
    }

    if (router.pathname === "/home") {
      return (
        <>
         
          
        </>
      );
    }

    if (router.pathname === "/profile") {
      return (
        <>
          <Link
            href="/home"
            className="px-4 py-2 bg-white text-usmPurple font-semibold rounded-lg shadow hover:bg-gray-200"
          >
            Home
          </Link>
          <button
            onClick={() => router.push("/register")} // Redirect to register page on logout
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600"
          >
            Log out
          </button>
        </>
      );
    }

    if (router.pathname === "/payment" || router.pathname.startsWith("/events")) {
      return (
        <>
          <Link
            href="/home"
            className="px-4 py-2 bg-white text-usmPurple font-semibold rounded-lg shadow hover:bg-gray-200"
          >
            Home
          </Link>
          <button
            onClick={() => router.push("/register")} // Redirect to register page on logout
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600"
          >
            Log out
          </button>
        </>
      );
    }
  };

  return (
    <header className={`${currentStyle} p-4 shadow-md bg-opacity-50`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex items-center">
          <Link href="/home">
            <img
              src="/usm-logo.png"
              alt="USM Logo"
              className="h-10 w-100 mr-4 cursor-pointer"
              style={{
                width: "100%", // Button takes full width of the box
                position: "relative",
                left: "500%",
              }}
            />
          </Link>
          <h1 className="text-xl forced-color-adjust-auto font-extrabold"
          style={{
            fontSize: "30px", // Button takes full width of the box
            position: "relative",
            left: "20%",
            fontFamily:"cursive",
          }}>
            USM Evently
          </h1>
        </div>

        {/* Page-Specific Buttons */}
        <div className="flex space-x-4">{renderHeaderElements()}</div>
      </div>
    </header>
  );
}
