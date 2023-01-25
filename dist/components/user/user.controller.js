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
exports.loginUser = exports.registerUser = void 0;
const app_1 = require("../../app");
const auth_1 = require("../../middlewares/auth");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const newUser = yield app_1.prisma.user.create({
            data: Object.assign({}, body)
        });
        res.status(201).json({
            ok: true,
            data: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                date_born: newUser.date_born,
                last_session: newUser.last_session,
                token: (0, auth_1.generateToken)(newUser.id)
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            data: error.message
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        let user = yield app_1.prisma.user.findFirst({
            where: {
                email: body.email
            },
        });
        if (user && user.password == body.password) {
            const currentTime = new Date();
            user = yield app_1.prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    last_session: currentTime.toISOString()
                        .replace(/\d\d:\d\d:\d\d/, currentTime.toLocaleTimeString())
                }
            });
            res.status(200).json({
                ok: true,
                data: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    date_born: user.date_born,
                    last_session: user.last_session,
                    token: (0, auth_1.generateToken)(user.id)
                }
            });
        }
        else {
            throw new Error("Invalid email or password");
        }
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            data: error.message
        });
    }
});
exports.loginUser = loginUser;
