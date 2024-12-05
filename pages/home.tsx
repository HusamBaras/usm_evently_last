import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "/event1.jpg",
    "/event2.jpg",
    "/event3.jpg",
    "/past1.jpg",
    "/past2.jpg",
    "/past3.jpg",
  ]; // Add all event and past images here

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

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
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow p-8">
          <div className="container mx-auto space-y-12">
            {/* Upcoming Events Section */}
            <section id="upcoming-events">
              <h2 className="text-3xl font-bold text-gold mb-6">Upcoming Events</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Event Tiles */}
                {[
                  { id: 1, name: "Orientation 2023", date: "2023-12-15", image: "/event1.jpg" },
                  { id: 2, name: "USM Open Day", date: "2023-12-20", image: "/event2.jpg" },
                  { id: 3, name: "Career Fair", date: "2024-01-10", image: "/event3.jpg" },
                ].map((event) => (
                  <Link key={event.id} href={`/events/upcoming/${event.id}`}>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                      <img src={event.image} alt={event.name} className="h-60 w-full object-cover" />
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-usmPurple">{event.name}</h3>
                        <p className="text-md text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Past Events Section */}
            <section id="past-events">
              <h2 className="text-3xl font-bold text-gold mb-6">Past Events</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Past Event Thumbnails */}
                {[
                  { id: 1, name: "Convocation 2022", image: "/past1.jpg" },
                  { id: 2, name: "Sports Day 2022", image: "/past2.jpg" },
                  { id: 3, name: "Science Expo", image: "/past3.jpg" },
                ].map((event) => (
                  <Link key={event.id} href={`/events/past/${event.id}`}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <img src={event.image} alt={event.name} className="h-40 w-full object-cover" />
                      <div className="p-4 text-center">
                        <h3 className="text-md font-medium text-gray-700">{event.name}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
