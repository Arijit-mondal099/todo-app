import mongoose, { Document } from "mongoose";

export interface ITodo extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new mongoose.Schema<ITodo>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model<ITodo>("Todo", TodoSchema);
