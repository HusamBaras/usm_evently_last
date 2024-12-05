import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Register() {
  const router = useRouter();

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Add Header */}
      <Header />

      <div
        className="flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: "url('/background-image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Content Box */}
        <div className="bg-white bg-opacity-80 rounded-lg shadow-2xl p-10 max-w-md w-full">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <img src="/usm-logo.png" alt="USM Logo" className="h-16 mb-4" />

            {/* Title */}
            <h1 className="text-3xl font-bold text-yellow-600 mb-6">
              USM Evently
            </h1>

            {/* Form */}
            <form className="flex flex-col gap-4 w-full">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-500"
              />
            </form>

            {/* Skip Button */}
            <button
              className="px-6 py-3 mt-6 text-white bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg shadow hover:shadow-lg hover:from-yellow-500 hover:to-yellow-700"
              onClick={() => router.push("/home")}
            >
              Skip
            </button>
          </div>
        </div>
      </div>

      {/* Add Footer */}
      <Footer />
    </div>
  );
}
