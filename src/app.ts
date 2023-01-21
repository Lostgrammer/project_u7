import express, {type Application} from "express";
import { userRouter, playlistRouter, songRouter } from "./components";

const app: Application = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/songs", songRouter);
app.use("/api/v1/playlist", playlistRouter);

export default app;

