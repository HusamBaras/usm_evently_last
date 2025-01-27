import { useState } from "react";
import { SignUp, SignIn } from "@clerk/nextjs";

export default function RegisterPage() {
  const [isSignUp, setIsSignUp] = useState(true); // Default to Sign-Up form

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
     
      {isSignUp ? (
        <SignUp
          routing="hash"
          signInUrl="/register"
          afterSignUpUrl="/home"
        />
      ) : (
        <SignIn
          routing="hash"
          signUpUrl="/register"
          afterSignInUrl="/home"
        />
      )}

      {/* Toggle Button */}
      
    </div>
  );
}