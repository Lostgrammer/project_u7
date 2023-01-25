"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const user_network_1 = require("../components/user/user.network");
const song_network_1 = require("../components/song/song.network");
const playlist_network_1 = require("../components/playlist/playlist.network");
const routes = [
    ["/users", user_network_1.userRouter],
    ["/songs", song_network_1.songRouter],
    ["/playlist", playlist_network_1.playlistRouter]
];
const router = (app) => {
    routes.forEach(([path, controller]) => {
        app.use("/api/v1" + path, controller);
    });
};
exports.router = router;
