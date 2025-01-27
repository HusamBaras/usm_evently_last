import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/lib/mongodb";
import EventModel from "@/lib/models/event";
import { Event } from "@/lib/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Connect to the database
    await connectMongoDB();

    // Extract the event ID from the query parameters
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    // Fetch the event from the database and cast it explicitly to the Event type
    const event = (await EventModel.findById(id).lean()) as Event | null;

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Return the event
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
