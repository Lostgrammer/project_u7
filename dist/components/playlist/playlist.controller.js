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
exports.findOne = exports.findAll = exports.create = void 0;
const app_1 = require("../../app");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.userId) {
            const { body } = req;
            const playlist = yield app_1.prisma.playlist.create({
                data: {
                    name: body.name,
                    userId: req.userId
                }
            });
            res.status(201).json({
                ok: true,
                data: playlist,
            });
        }
        else {
            res.status(401).json({
                ok: false,
                data: "Please log in or sign up to create a playlist."
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
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.userId);
        if (req.userId) {
            const playlists = yield app_1.prisma.playlist.findMany({
                where: {
                    userId: req.userId
                },
                include: {
                    songs: true
                }
            });
            res.json({
                ok: true,
                data: playlists
            });
        }
        else {
            res.status(401).json({
                ok: false,
                data: "Please log in or sign up to view your playlists."
            });
        }
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
        if (req.userId) {
            const playlist = yield app_1.prisma.playlist.findFirst({
                where: {
                    id: parseInt(req.params.id),
                },
                include: {
                    songs: true
                }
            });
            if ((playlist === null || playlist === void 0 ? void 0 : playlist.userId) != req.userId) {
                throw new Error("This is not your playlist.");
            }
            res.json({
                ok: true,
                data: playlist
            });
        }
        else {
            res.status(401).json({
                ok: false,
                data: "Please log in or sign up to view your playlists."
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
