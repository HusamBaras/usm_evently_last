import { AppProps } from "next/app";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "../styles/clerk-custom.css";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/globals.css";
import { ToastProvider } from "@/components/ui/toast-provider"; // Import ToastProvider
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ClerkProvider>
      <ToastProvider>
        {/* Wrap the app with ToastProvider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}

          >
            <Header />
            {/* Signed-Out View */}
            <SignedOut>
              <div className="flex flex-col min-h-screen">
                <div className="flex flex-1">
                  {/* Left Side - Illustration */}
                  <div
                    className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600"
                    style={{ flex: 6 }}
                  >
                    <img
                      src="/background-image.jpg"
                      alt="USM Illustration"
                      className="object-cover h-full w-full"
                    />
                  </div>

                  {/* Right Side - Sign-In Section */}
                  <div
                    className="flex flex-1 items-center justify-center bg-gradient-to-r from-purple-500 to-white"
                    style={{ flex: 4 }}
                  >
                    <div
                      className="bg-gray-100 p-8 rounded-lg shadow-lg text-center"
                      style={{
                        width: "70%",
                        height: "50%",
                        position: "relative",
                        top: "-50px",
                        backgroundColor: "#2b0546",
                      }}
                    >
                      {/* Heading */}
                      <h1 className="text-4xl font-bold mb-4 text-white hover:text-orange-400 transition-transform duration-300">
                        Welcome to USM Evently
                      </h1>

                      {/* Description */}
                      <p className="text-white mb-6 text-lg hover:text-orange-400 transition-transform duration-300">
                        Discover events.
                        <br />
                        Connect with friends.
                        <br />
                        Transform your campus experience.
                      </p>

                      {/* Sign-In Button */}
                      <SignInButton mode="modal">
                        <button
                          className="px-6 py-3 text-white bg-orange-500 rounded-lg hover:bg-orange-600 text-2xl"
                          style={{ width: "50%" }}
                        >
                          Start Now
                        </button>
                      </SignInButton>
                    </div>
                  </div>
                </div>
              </div>
            </SignedOut>

            {/* Signed-In View */}
            <SignedIn>
              <div className="flex flex-col min-h-screen bg-gray-100">
                {/* Main Content */}
                <main
                  className="flex-1 flex items-center justify-center p-4"
                  style={{ backgroundColor: "#2b0546" }}
                >
                  <div className="text-center w-full max-w-screen-lg">
                    {/* User Button */}
                    <div className="mb-4">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                    {/* Render Main Component */}
                    <Component {...pageProps} />
                  </div>
                </main>

                {/* Footer */}
                
              </div>
            </SignedIn>
            <Footer />
          </motion.div>
        </AnimatePresence>
      </ToastProvider>
    </ClerkProvider>
  );
}
