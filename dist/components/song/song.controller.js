"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPlaylist = exports.create = exports.findOne = exports.findAll = void 0;
const app_1 = require("../../app");
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield app_1.prisma.song.findMany();
        if (req.userId)
            res.json({ ok: true, data: songs });
        else
            res.json({ ok: true, data: songs.filter(song => song.isPublic) });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            data: error.message,
        });
    }
});
exports.findAll = findAll;
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const song = yield app_1.prisma.song.findFirst({
            where: {
                id: parseInt(req.params.id),
            }
        });
        if (!req.userId && !(song === null || song === void 0 ? void 0 : song.isPublic)) {
            res.status(401).json({
                ok: false,
                data: "Song is not public. Please log in."
            });
        }
        else {
            res.json({
                ok: true,
                data: {
                    name: song === null || song === void 0 ? void 0 : song.name,
                    artist: song === null || song === void 0 ? void 0 : song.artist,
                    album: song === null || song === void 0 ? void 0 : song.album,
                    year: song === null || song === void 0 ? void 0 : song.year,
                    genre: song === null || song === void 0 ? void 0 : song.genre,
                    duration: song === null || song === void 0 ? void 0 : song.duration
                }
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            data: error.message
        });
    }
});
exports.findOne = findOne;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const user = yield app_1.prisma.user.findFirst({
            where: {
                id: req.userId
            }
        });
        if (user && user.email == "admin@admin.com") {
            const newSong = yield app_1.prisma.song.create({
                data: {
                    name: body.name,
                    artist: body.artist,
                    album: body.album,
                    year: body.year,
                    genre: body.genre,
                    duration: body.duration,
                    isPublic: body.isPublic
                }
            });
            res.status(201).json({
                ok: true,
                data: newSong,
            });
        }
        else {
            res.status(403).json({
                ok: false,
                data: "Creation not allowed",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            data: error.message
        });
    }
});
exports.create = create;
const toPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            res.status(401).json({
                ok: false,
                data: "Please log in or sign up to create a playlist."
            });
            return;
        }
        const { body } = req;
        if (!(body.songId && (body.playlistId ? !body.playlistName : body.playlistName))) {
            res.status(400).json({
                ok: false,
                data: "Please enter a songId, and a playlistId or playlistName "
            });
            return;
        }
        let playlist;
        if (body.playlistId) {
            playlist = yield app_1.prisma.playlist.update({
                where: { id: body.playlistId },
                data: {
                    songs: { connect: { id: body.songId } }
                }
            });
        }
        else {
            playlist = yield app_1.prisma.playlist.create({
                data: {
                    name: body.playlistName,
                    userId: req.userId,
                    songs: {
                        connect: { id: body.songId }
                    }
                }
            });
        }
        playlist = yield app_1.prisma.playlist.findFirst({
            where: {
                id: playlist.id,
            },
            include: {
                songs: true
            }
        });
        res.status(201).json({
            ok: true,
            data: playlist,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            data: error.message
        });
    }
});
exports.toPlaylist = toPlaylist;
