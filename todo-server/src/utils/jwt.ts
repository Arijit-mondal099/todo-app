import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const genToken = (id: string | any): string => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" });
};
