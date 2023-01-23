import { Router } from "express";
import { findAll, findOne } from "./song.controller";

export const songRouter = Router();

songRouter.get("", findAll);
songRouter.get("/:id", findOne);