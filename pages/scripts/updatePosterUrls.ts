import mongoose from "mongoose";
import EventModel from "../../lib/models/event"; // Adjust the path if necessary

const updatePosterUrls = async () => {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI || "");

  try {
    console.log("Connected to MongoDB.");

    // Find events where posterUrl is missing or empty
    const events = await EventModel.find({ posterUrl: { $exists: false } });

    if (events.length === 0) {
      console.log("No events found that need updates.");
    } else {
      for (const event of events) {
        event.posterUrl = "/placeholder.jpg"; // Set default posterUrl
        await event.save();
        console.log(`Updated event: ${event.name}`);
      }
      console.log(`Updated ${events.length} events with default posterUrl.`);
    }
  } catch (err) {
    console.error("Error updating events:", err);
  } finally {
    mongoose.connection.close();
    console.log("Connection to MongoDB closed.");
  }
};

updatePosterUrls();
