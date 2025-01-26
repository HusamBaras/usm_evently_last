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
import Header from "../components/Header"; // Adjust path if needed
import Footer from "../components/Footer"; // Adjust path if needed
import "../styles/globals.css";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ClerkProvider>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header at the Top */}
          <Header />

          {/* Signed-Out View */}
          <SignedOut>
            <div className="flex flex-col min-h-screen">
              <div className="flex flex-1">
                {/* Left Side - Image */}
                <div
                  className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-r from-purple-500 to-purple-500"
                  style={{ flex: 6,  backgroundColor: "white", }} // Left side takes 60% width
                >
                  <img
                    src="/background-image.jpg" // Replace with your actual image path
                    className="object-cover h-full w-full"
                    alt="USM Illustration"
                    style={{
                      height: "100%",
                      
                      
                    }}
                  />
                </div>

                {/* Right Side - Form */}
                <div
                  className="flex flex-1 items-center justify-center bg-gradient-to-r from-purple-500 to-white-500 "
                  style={{
                    flex: 4,
                    backgroundColor: "white",
                  }} 
                >
                  {/* Box for Content */}
                  
                  <div
                    className="bg-gray-100 p-8 rounded-lg shadow-lg"
                    style={{
                      width: "70%", // Adjust box width
                      height: "50%",
                      textAlign: "center", // Center the text inside the box
                      position: "relative",
                      top: "-50px",
                      backgroundColor:"#2b0546"
                    }}
                  >
                    {/* Animated Heading */}
                    <h1
                      className="text-3xl font-bold mb-4 text-white-800 animate-expand"
                      style={{
                        fontSize: "2rem", // Adjust font size for the title
                        
                      
                      }}
                    >
                     
                      <span className="hover:text-orange-400 transition-transform duration-300 "> 
                       Welcome to USM Evently
                      </span>
                    </h1>

                    <p
                      className="text-white-600 mb-6"
                      style={{
                        fontSize: "1.5rem",
                        // Adjust font size for the description
                      }}
                    >
                      <br></br>
                      <span className="hover:text-orange-400 transition-transform duration-300 "> 
                      Discover events.<br></br><br></br> Connect with friends.<br></br><br></br>  Transform your campus experience.
                      </span>
                     
                    </p>
                    <SignInButton mode="modal">
                      <button
                        className="px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600"
                        style={{
                          width: "50%", // Button takes full width of the box
                          position: "relative",
                          top: "5%",
                          fontSize: "30px",
                          backgroundColor: "#ea9e0d",
                        }}
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
    <main className="flex-1 flex items-center justify-center p-4 bg-green"
      style={{
       
        backgroundColor: "#2b0546", // Adjust background if necessary
      }}>
      <div
        className=""
        style={{
          textAlign: "center", // Center-align content
          
          width:"155%", 
          
        }}
      >
        <UserButton  afterSignOutUrl="/"/>
        {/* Render the homepage content */}
        <Component {...pageProps} />
      </div>
    </main>

    {/* Footer */}
    <Footer />
  </div>
</SignedIn>
        </motion.div>
      </AnimatePresence>
    </ClerkProvider>
  );
}
