import mongoose from "mongoose";

const DB_URI = process.env.DB_URI!;

export const dbConnection = async (): Promise<void> => {
  try {
    const res = await mongoose.connect(DB_URI);
    console.log(`DB Connected On: ${res.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`DB Connection Failed: ${error.message}`);
    } else {
      console.error("DB Connection Failed: Unknown error", error);
    }
    process.exit(1);
  }
};
