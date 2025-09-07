import express from "express";
import { getUser, login, register } from "../controllers/user.controller";
import { authentication } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/").get(authentication, getUser);

export default router;
