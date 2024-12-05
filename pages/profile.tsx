import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Profile() {
  // State for editable fields
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Noor Mohammad Sowan",
    email: "noormohammadsowan@student.usm.my",
    phone: "+60145202958",
    myCSDPoints: 168, // MyCSD score
  });

  // Dummy event history
  const eventHistory = [
    { id: 1, name: "Convocation 2022", date: "2022-09-15" },
    { id: 2, name: "Sports Day 2023", date: "2023-03-22" },
  ];

  // Handle field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-8">
        <Card className="p-6 bg-white rounded-lg shadow-lg">
          {/* Profile Picture and MyCSD Points */}
          <CardHeader className="flex items-center space-x-6">
            <div className="h-24 w-24 bg-gray-300 rounded-full overflow-hidden shadow-md">
              <img
                src="/profile-placeholder.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-usmPurple">
                {userInfo.name}
              </CardTitle>
              <p className="text-md text-gray-700 mt-2">
                MyCSD: ⭐⭐⭐⭐⭐{userInfo.myCSDPoints}
              </p>
            </div>
          </CardHeader>

          {/* User Information */}
          <CardContent className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              {isEditing ? (
                <Input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-600">{userInfo.name}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              {isEditing ? (
                <Input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-600">{userInfo.email}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Phone</label>
              {isEditing ? (
                <Input
                  type="text"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-600">{userInfo.phone}</p>
              )}
            </div>
          </CardContent>

          {/* Edit and Save Button */}
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 w-full"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>

          {/* Event History */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-usmPurple mb-4">
              Event History
            </h3>
            <ul className="space-y-4">
              {eventHistory.map((event) => (
                <Card key={event.id} className="p-4">
                  <CardTitle>{event.name}</CardTitle>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </Card>
              ))}
            </ul>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
