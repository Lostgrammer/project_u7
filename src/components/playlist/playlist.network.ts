import { Router } from "express";
import { create, findAll, findOne } from "./playlist.controller";

export const playlistRouter = Router();

playlistRouter.post("", create);
playlistRouter.get("", findAll);
playlistRouter.get("/:id", findOne);