import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/lib/mongodb";
import Event from "@/lib/models/event";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Extract data from the request body
    const { name, date, description, googleFormLink, posterUrl } = req.body;

    // Validate required fields
    if (!name || !date || !description || !googleFormLink || !posterUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a new event in the database
    const newEvent = new Event({
      name,
      date,
      description,
      googleFormLink,
      posterUrl,
      createdBy: "admin@example.com", // Replace with actual user info if available
    });

    await newEvent.save();

    // Respond with the created event
    return res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
