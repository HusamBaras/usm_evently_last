import mongoose, { Connection, ConnectOptions } from "mongoose";

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

// Initialize global mongoose variable
global.mongoose = global.mongoose || {
  conn: null,
  promise: null,
};

export async function connectMongoDB(): Promise<Connection> {
  try {
    if (global.mongoose.conn) {
      console.log("Connected Previously");
      return global.mongoose.conn;
    } else {
      const conString = process.env.MONGODB_URI;

      if (!conString) {
        throw new Error("MONGODB_URI is not defined in environment variables");
      }

      if (!global.mongoose.promise) {
        global.mongoose.promise = mongoose.connect(conString, {
          autoIndex: true,
        } as ConnectOptions).then((mongooseInstance) => mongooseInstance.connection);
      }

      global.mongoose.conn = await global.mongoose.promise;
      console.log("Connected to MongoDB.");

      return global.mongoose.conn;
    }
  } catch (error) {
    console.error("Couldn't connect to DB: ", error);
    throw error;
  }
}

export default connectMongoDB;
