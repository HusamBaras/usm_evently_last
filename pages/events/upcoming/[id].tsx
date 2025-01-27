import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Event {
  _id: string;
  name: string;
  date: string;
  description: string;
  posterUrl?: string;
  googleFormLink?: string;
}

export default function UpcomingEventDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/events/upcoming/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch event details");
          }
          return response.json();
        })
        .then((data) => {
          setEvent(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching event details:", error);
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Event not found.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="flex-grow p-8 bg-gray-100">
        <div className="container mx-auto">
          {/* Event Details Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Event Image */}
            <img
              src={event.posterUrl || "/placeholder.jpg"}
              alt={event.name}
              className="w-full h-72 object-cover"
            />
            {/* Event Info */}
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-800">{event.name}</h1>
              <p className="text-gray-600 mt-4">{event.description}</p>
              <p className="text-gray-600 mt-2">
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              {/* Payment Button */}
              {event.googleFormLink && (
                <div className="mt-4">
                  <Button
                    variant="default"
                    onClick={() => window.open(event.googleFormLink, "_blank")}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Go to Payment
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
