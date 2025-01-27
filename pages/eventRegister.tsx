import Header from "../components/Header";
import Footer from "../components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import { SignUp, SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Regis() {
    const router = useRouter();

    // State for payment details
    const [userDetails, setDetails] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    eventID: "",
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return(
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow container mx-auto p-8 flex justify-center items-center">
        <Card className="w-full max-w-lg bg-white rounded-lg shadow-xl">
            {/* Event Summary */}
            <CardHeader className="p-6 bg-gradient-to-r from-usmPurple to-gold text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Register Form</CardTitle>
            </CardHeader>

            {/* Registering Form */}
            <CardContent className="space-y-6 p-6">
            {/* Full Name */}
            <div>
                <label className="block text-gray-700 font-medium">
                Full Name
                </label>
                <Input
                type="text"
                name="name"
                placeholder="(e.g., Enter Your Name)"
                value={userDetails.name}
                onChange={handleChange}
                className="focus:ring focus:ring-usmPurple transition-all"
                />
            </div>

            {/* Phone Number */}
            <div>
                <label className="block text-gray-700 font-medium">Phone Number</label>
                <Input
                type="number"
                name="phoneNumber"
                placeholder="+601112345678"
                value={userDetails.phoneNumber}
                onChange={handleChange}
                className="focus:ring focus:ring-usmPurple transition-all"
                />
            </div>

            {/* Email */}
            <div>
                <label className="block text-gray-700 font-medium">
                Email Address
                </label>
                <Input
                type="text"
                name="email"
                placeholder="abc@gmail.com"
                value={userDetails.email}
                onChange={handleChange}
                className="focus:ring focus:ring-usmPurple transition-all"
                />
            </div>

            {/* Event ID */}
            <div>
                <label className="block text-gray-700 font-medium">Event ID</label>
                <Input
                type="text"
                name="eventID"
                placeholder="123456"
                value={userDetails.eventID}
                onChange={handleChange}
                className="focus:ring focus:ring-usmPurple transition-all"
                />
            </div>
            </CardContent>

            {/* Submit Button with Confirmation */}
            <div className="p-6">
            <Dialog>
                <DialogTrigger asChild>
                <Button className="w-full bg-gradient-to-r from-usmPurple to-gold text-white hover:from-purple-600 hover:to-yellow-500">
                    Register
                </Button>
                </DialogTrigger>
                <DialogContent className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto text-center">
                <h2 className="text-2xl font-bold text-usmPurple mb-4">
                    Registered Successfully!
                </h2>

                <Button
                  onClick={() => router.push("/home")} // Redirect to home page
                  className="mt-4 w-full bg-gold text-usmPurple hover:bg-yellow-500"
                >
                  Close
                </Button>
                </DialogContent>
            </Dialog>
            </div>
        </Card>
        </main>
        

        {/* Footer */}
        <Footer />
    </div>
    );
}