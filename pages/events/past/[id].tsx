import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { Event } from "@/lib/types";
import { useEffect, useState } from "react";

export default function PastEventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/events/past/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch event details");
          }
          return response.json();
        })
        .then((data) => setEvent(data))
        .catch((error) => console.error("Failed to fetch event details", error));
    }
  }, [id]);

  if (!event) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="flex-grow p-8 bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="container mx-auto">
          <Card className="rounded-lg shadow-xl overflow-hidden">
            <img
              src={event.posterUrl || "/placeholder.jpg"}
              alt={event.name || "Event"}
              className="w-full h-72 object-cover"
            />
            <CardHeader className="p-6 bg-gradient-to-r from-purple-800 to-yellow-500 text-white">
              <CardTitle className="text-3xl font-bold">{event.name || "Past Event"}</CardTitle>
              <Badge className="mt-2 bg-yellow-500 text-black">Past Event</Badge>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-md text-gray-600 mb-2">
                <strong>Date:</strong>{" "}
                {event.date ? new Date(event.date).toLocaleDateString() : "No date available"}
              </p>
              <p className="text-md text-gray-600 mb-4">
                <strong>Description:</strong> {event.description || "No description available."}
              </p>
              {event.photosLink && (
                <Button
                  variant="default"
                  onClick={() => window.open(event.photosLink, "_blank")}
                >
                  View Event Photos
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
