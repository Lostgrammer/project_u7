import { userRouter } from "../components/user/user.network"
const routes = [
    ["/users", userRouter],
];

export const router = (app: any) => {
    routes.forEach(([path, controller])=> {
        app.use("/api/v1"+path, controller);
    });
}