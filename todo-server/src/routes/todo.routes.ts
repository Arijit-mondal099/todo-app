import express from "express";
import { authentication } from "../middlewares/auth.middleware";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller";

const router = express.Router();

router
  .route("/")
  .get(authentication, getTodos)
  .post(authentication, createTodo);

router
  .route("/:id")
  .put(authentication, updateTodo)
  .delete(authentication, deleteTodo)
  .get(authentication, getTodo);

export default router;
