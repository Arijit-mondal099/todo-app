import express, { Request, Response } from "express";
import userRouter from "./routes/user.routes";
import todoRouter from "./routes/todo.routes";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://todo-app-b219.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

// Error handling middleware
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
