import { Router } from "express";
import { findAll, store } from "./controller";

const songRouter: Router = Router();

songRouter.get("/", findAll);
songRouter.post("/", store);

export default songRouter;