import mongoose, { Schema, model, models } from "mongoose";

const EventSchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    posterUrl: { type: String, default: "/placeholder.jpg" },
    googleFormLink: { type: String },
    createdBy: { type: String, required: true },
    photosLink: { type: String },
  },
  { timestamps: true }
);

// Ensure the model is initialized only once
const EventModel = models.Event || model("Event", EventSchema);

export default EventModel;
