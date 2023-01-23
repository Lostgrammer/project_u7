import { Router } from "express";
import { registerUser, loginUser } from "./user.controller";

export const userRouter = Router();

userRouter.post("/users", registerUser);
userRouter.post("/users", loginUser);