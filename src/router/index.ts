import { userRouter } from "../components/user/user.network";
import { songRouter } from "../components/song/song.network";

const routes = [
    ["/users", userRouter],
    ["/songs", songRouter],
];

export const router = (app: any) => {
    routes.forEach(([path, controller])=> {
        app.use("/api/v1"+path, controller);
    });
}