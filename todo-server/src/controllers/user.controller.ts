import { Request, Response } from "express";
import { User } from "../models/user.model";
import { ApiResponse } from "../utils/api";
import { genToken } from "../utils/jwt";
import { AuthenticationRequest } from "../middlewares/auth.middleware";

/**
 * route: /api/users/register
 * method: POST
 * desc: create user
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res
        .status(400)
        .json(
          new ApiResponse<null>(
            false,
            "User alredy exist with credentials!",
            null
          )
        );
    }

    const user = await User.create({ name, email, password });

    const token = genToken(user._id);

    return res
      .status(201)
      .json(new ApiResponse(true, "User created", { token: token }));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse<null>(false, "Internal server error", null));
  }
};

/**
 * route: /api/users/login
 * method: POST
 * desc: login user
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse<null>(false, "Invalid email or password!", null));
    }

    const isMatched = await user.isPasswordMatched(password);
    if (!isMatched) {
      return res
        .status(400)
        .json(new ApiResponse<null>(false, "Invalid email or password!", null));
    }

    const token = genToken(user._id);

    return res
      .status(200)
      .json(new ApiResponse(true, "User login", { token: token }));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse<null>(false, "Internal server error", null));
  }
};

/**
 * route: /api/users
 * method: GET
 * desc: get user profile and checking auth
 */
export const getUser = async (req: AuthenticationRequest, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json(new ApiResponse<null>(false, "Unauthorized", null));
    }

    const { id } = req.user;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json(new ApiResponse<null>(false, "User not found", null));
    }

    return res
      .status(200)
      .json(new ApiResponse(true, "User fetched successfully", user));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse<null>(false, "Internal server error", null));
  }
};
