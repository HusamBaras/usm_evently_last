import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/router";

export default function UpcomingEventDetails() {
  const router = useRouter();
  const { id } = router.query;

  // Dummy data for demonstration
  const event = {
    id,
    name: `Upcoming Event ${id}`,
    date: "2023-12-15",
    description:
      "This is the detailed description of an upcoming event. Get ready to experience an exciting day filled with knowledge sharing and networking opportunities.",
    image: `/event${id}.jpg`,
    location: "USM Main Hall, Penang",
    time: "10:00 AM - 4:00 PM",
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="flex-grow p-8 bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="container mx-auto">
          <Card className="rounded-lg shadow-xl overflow-hidden">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-72 object-cover"
            />
            <CardHeader className="p-6 bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <CardTitle className="text-3xl font-bold">{event.name}</CardTitle>
              <Badge className="mt-2 bg-green-500 text-black">
                Upcoming Event
              </Badge>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-md text-gray-600 mb-2">
                <strong>Date:</strong> {event.date}
              </p>
              <p className="text-md text-gray-600 mb-2">
                <strong>Time:</strong> {event.time}
              </p>
              <p className="text-md text-gray-600 mb-4">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-gray-700 mb-6">{event.description}</p>
              <div className="flex space-x-4">
                <Button
                  variant="default"
                  onClick={() => alert("Added to calendar!")}
                >
                  Add to Calendar
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => alert("Share this event!")}
                >
                  Share Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
