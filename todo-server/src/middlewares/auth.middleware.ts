import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/api";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
import { Types } from "mongoose";

export interface AuthenticationRequest extends Request {
  user?: {
    id: string | Types.ObjectId;
    email: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET!;

export const authentication = async (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split("Bearer ")[1];

    if (!token) {
      res
        .status(401)
        .json(
          new ApiResponse<null>(false, "Invalid or token not provided!", null)
        );
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      id: string;
    };

    const user = await User.findById(decoded.id);

    if (!user) {
      res
        .status(401)
        .json(new ApiResponse<null>(false, "User not found!", null));
      return;
    }

    // Attach user info to request
    req.user = {
      id: user._id as Types.ObjectId,
      email: user.email,
    };

    next();
  } catch (error) {
    res
      .status(401)
      .json(
        new ApiResponse<null>(false, "Invalid token or not provided!", null)
      );
  }
};
