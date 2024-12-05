import Header from "../components/Header";
import Footer from "../components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/router";

export default function Payment() {
  const router = useRouter();

  // State for payment details
  const [paymentDetails, setPaymentDetails] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    description: "",
    date: "",
    amount: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-8 flex justify-center items-center">
        <Card className="w-full max-w-lg bg-white rounded-lg shadow-xl">
          {/* Event Summary */}
          <CardHeader className="p-6 bg-gradient-to-r from-usmPurple to-gold text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Payment Summary</CardTitle>
          </CardHeader>

          {/* Payment Form */}
          <CardContent className="space-y-6 p-6">
            {/* Payment Description */}
            <div>
              <label className="block text-gray-700 font-medium">
                Payment Description
              </label>
              <Input
                type="text"
                name="description"
                placeholder="Description (e.g., Event Ticket)"
                value={paymentDetails.description}
                onChange={handleChange}
                className="focus:ring focus:ring-usmPurple transition-all"
              />
            </div>

            {/* Payment Date */}
            <div>
              <label className="block text-gray-700 font-medium">Payment Date</label>
              <Input
                type="date"
                name="date"
                value={paymentDetails.date}
                onChange={handleChange}
                className="focus:ring focus:ring-usmPurple transition-all"
              />
            </div>

            {/* Payment Amount */}
            <div>
              <label className="block text-gray-700 font-medium">Amount (USD)</label>
              <Input
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={paymentDetails.amount}
                onChange={handleChange}
                className="focus:ring focus:ring-usmPurple transition-all"
              />
            </div>

            {/* Cardholder Name */}
            <div>
              <label className="block text-gray-700 font-medium">
                Cardholder Name
              </label>
              <Input
                type="text"
                name="cardholderName"
                placeholder="Enter your name"
                value={paymentDetails.cardholderName}
                onChange={handleChange}
                className="focus:ring focus:ring-usmPurple transition-all"
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-gray-700 font-medium">Card Number</label>
              <Input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                className="focus:ring focus:ring-usmPurple transition-all"
              />
            </div>

            {/* Expiry Date and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">Expiry Date</label>
                <Input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={handleChange}
                  className="focus:ring focus:ring-usmPurple transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">CVV</label>
                <Input
                  type="password"
                  name="cvv"
                  placeholder="123"
                  value={paymentDetails.cvv}
                  onChange={handleChange}
                  className="focus:ring focus:ring-usmPurple transition-all"
                />
              </div>
            </div>
          </CardContent>

          {/* Submit Button with Confirmation */}
          <div className="p-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-gradient-to-r from-usmPurple to-gold text-white hover:from-purple-600 hover:to-yellow-500">
                  Submit Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto text-center">
                <h2 className="text-2xl font-bold text-usmPurple mb-4">
                  Payment Successful!
                </h2>
                <p className="text-gray-600">Payment Details:</p>
                <p className="text-gray-600">
                  <strong>Description:</strong> {paymentDetails.description || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Date:</strong> {paymentDetails.date || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Amount:</strong> ${paymentDetails.amount || "N/A"}
                </p>
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
