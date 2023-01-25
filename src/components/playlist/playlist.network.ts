import { Router } from "express";
import { create, findAll, findOne } from "./playlist.controller";
import { auth } from "../../middlewares/auth"

export const playlistRouter = Router();

playlistRouter.post("", auth, create);
playlistRouter.get("", auth, findAll);
playlistRouter.get("/:id", auth, findOne);