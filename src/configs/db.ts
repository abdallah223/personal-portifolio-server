import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
  if (!env.mongoUri) throw new Error("There is no database connection");
  await mongoose.connect(env.mongoUri);
  console.log("database is connected");
}
