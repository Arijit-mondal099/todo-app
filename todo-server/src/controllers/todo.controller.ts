import { AuthenticationRequest } from "../middlewares/auth.middleware";
import { Response } from "express";
import { ApiResponse } from "../utils/api";
import { Todo } from "../models/todo.model";

/**
 * route: /api/todos
 * method: POST
 * desc: create todo
 */
export const createTodo = async (req: AuthenticationRequest, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json(new ApiResponse<null>(false, "Unauthorized", null));
    }
    const { title, content, priority } = req.body;

    const todo = await Todo.create({
      user: req.user.id,
      title: title,
      content: content,
      priority: priority,
    });

    return res.status(200).json(new ApiResponse(true, "todo created", todo));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse<null>(false, "Internal server error", null));
  }
};

/**
 * route: /api/todos/:id
 * method: PUT
 * desc: update todo
 */
export const updateTodo = async (req: AuthenticationRequest, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json(new ApiResponse<null>(false, "Unauthorized", null));
    }
    const { title, content, priority } = req.body;

    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res
        .status(404)
        .json(new ApiResponse<null>(false, "Todo not found!", null));
    }

    todo.title = title || todo.title;
    todo.content = content || todo.content;
    todo.priority = priority || todo.priority;
    await todo.save();

    return res.status(200).json(new ApiResponse(true, "todo updated", todo));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse<null>(false, "Internal server error", null));
  }
};

/**
 * route: /api/todos/:id
 * method: DELETE
 * desc: delete todo
 */
export const deleteTodo = async (req: AuthenticationRequest, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json(new ApiResponse<null>(false, "Unauthorized", null));
    }

    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res
        .status(404)
        .json(new ApiResponse<null>(false, "Todo not found!", null));
    }

    await Todo.findByIdAndDelete(req.params.id);

    return res.status(200).json(new ApiResponse(true, "todo deleted"));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse<null>(false, "Internal server error", null));
  }
};

/**
 * route: /api/todos/:id
 * method: GET
 * desc: get todo by id
 */
export const getTodo = async (req: AuthenticationRequest, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json(new ApiResponse<null>(false, "Unauthorized", null));
    }

    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res
        .status(404)
        .json(new ApiResponse<null>(false, "Todo not found!", null));
    }

    return res.status(200).json(new ApiResponse(true, "fetched", todo));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse<null>(false, "Internal server error", null));
  }
};

/**
 * route: /api/todos
 * method: GET
 * desc: get todos
 */
export const getTodos = async (req: AuthenticationRequest, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json(new ApiResponse<null>(false, "Unauthorized", null));
    }

    const todos = await Todo.find({ user: req.user.id });

    return res.status(200).json(new ApiResponse(true, "fetched", todos));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse<null>(false, "Internal server error", null));
  }
};
