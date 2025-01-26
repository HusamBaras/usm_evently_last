import { useState } from "react";
import { SignUp, SignIn } from "@clerk/nextjs";

export default function RegisterPage() {
  const [isSignUp, setIsSignUp] = useState(true); // Default to Sign-Up form

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        {isSignUp ? "Create an Account" : "Welcome Back! Log In"}
      </h1>
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
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        {isSignUp ? "Already have an account? Log In" : "New here? Sign Up"}
      </button>
    </div>
  );
}
