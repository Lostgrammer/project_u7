import { userRouter } from "../components/user/user.network";
import { songRouter } from "../components/song/song.network";
import { playlistRouter } from "../components/playlist/playlist.network";

const routes = [
    ["/users", userRouter],
    ["/songs", songRouter],
    ["/playlist", playlistRouter]
];

export const router = (app: any) => {
    routes.forEach(([path, controller])=> {
        app.use("/api/v1"+path, controller);
    });
}