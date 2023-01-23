const routes = [];

export const router = app  => {
    routes.forEach(([path, controller])=> {
        app.use(path, controller);
    });
}