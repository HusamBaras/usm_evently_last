import { ObjectId } from "mongodb";

export interface Event {
  _id: string | ObjectId; // Allow both ObjectId and string
  name: string;
  date: string | Date;
  description: string;
  posterUrl?: string;
  googleFormLink?: string;
  createdBy?: string;
  photosLink?: string;
}
