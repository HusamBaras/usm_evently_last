import { useState, useEffect } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { Event } from "@/lib/types";
import connectMongoDB from "@/lib/mongodb";
import EventModel from "@/lib/models/event";
import { useUser } from "@clerk/nextjs";

interface HomeProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export default function Home({ upcomingEvents, pastEvents }: HomeProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const { user } = useUser();

  // Combine all event poster URLs for the slideshow
  const images = [
    ...upcomingEvents.map((e) => e.posterUrl || "/placeholder.jpg"),
    ...pastEvents.map((e) => e.posterUrl || "/placeholder.jpg"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const res = await fetch(`/api/events/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Event deleted successfully!");
          window.location.reload(); // Refresh the page to reflect changes
        } else {
          alert("Failed to delete the event.");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("An error occurred while deleting the event.");
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Slideshow Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-lg"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
          transition: "background-image 1s ease-in-out",
        }}
      />

      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-grow p-8">
          <div className="container mx-auto space-y-12">
            {/* Create Event Button */}
            <div className="flex justify-end mb-8">
              <Link href="/events/create">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                  Create Event
                </button>
              </Link>
            </div>

            {/* Upcoming Events Section */}
            <section id="upcoming-events">
              <h2 className="text-3xl font-bold text-gold mb-6">Upcoming Events</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div
                      key={event._id.toString()}
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all"
                    >
                      <img
                        src={event.posterUrl || "/placeholder.jpg"}
                        alt={event.name}
                        className="h-60 w-full object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-usmPurple">{event.name}</h3>
                        <p className="text-md text-gray-500">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                        <div className="mt-4 flex space-x-2">
                          <Link href={`/events/upcoming/${event._id.toString()}`}>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
                              View Details
                            </button>
                          </Link>
                          {event.createdBy === user?.id && (
                            <>
                              <Link href={`/events/edit/${event._id.toString()}`}>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                                  Edit
                                </button>
                              </Link>
                              <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                                onClick={() => handleDelete(event._id.toString())}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No upcoming events available.</p>
                )}
              </div>
            </section>

            {/* Past Events Section */}
            <section id="past-events">
              <h2 className="text-3xl font-bold text-gold mb-6">Past Events</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.length > 0 ? (
                  pastEvents.map((event) => (
                    <div
                      key={event._id.toString()}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition-all"
                    >
                      <img
                        src={event.posterUrl || "/placeholder.jpg"}
                        alt={event.name}
                        className="h-40 w-full object-cover"
                      />
                      <div className="p-4 text-center">
                        <h3 className="text-md font-medium text-gray-700">{event.name}</h3>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No past events available.</p>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

// Fetch upcoming and past events from the database
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await connectMongoDB();

    // Fetch upcoming events (future dates)
    const upcomingEvents = await EventModel.find({ date: { $gte: new Date() } }).lean();

    // Fetch past events (past dates)
    const pastEvents = await EventModel.find({ date: { $lt: new Date() } }).lean();

    // Map events to ensure `_id` is a string and `date`/`createdAt` are serialized
    const transformEvent = (event: any) => ({
      ...event,
      _id: event._id.toString(), // Convert MongoDB ObjectId to string
      date: new Date(event.date).toISOString(), // Serialize `date` to ISO string
      createdAt: event.createdAt ? new Date(event.createdAt).toISOString() : null, // Serialize `createdAt`
      updatedAt: event.updatedAt ? new Date(event.updatedAt).toISOString() : null, // Serialize `updatedAt`
    });

    return {
      props: {
        upcomingEvents: upcomingEvents.map(transformEvent),
        pastEvents: pastEvents.map(transformEvent),
      },
    };
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return {
      props: {
        upcomingEvents: [],
        pastEvents: [],
      },
    };
  }
};
