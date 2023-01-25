import { Router } from "express";
import { findAll, findOne, create, toPlaylist } from "./song.controller";
import { auth } from "../../middlewares/auth"

export const songRouter = Router();

songRouter.get("", auth, findAll);
songRouter.get("/:id", auth, findOne);
songRouter.post("", auth, create);
songRouter.post("/to-playlist", auth, toPlaylist);