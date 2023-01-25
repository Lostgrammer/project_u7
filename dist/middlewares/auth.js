"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== "production")
    dotenv_1.default.config();
const KEY = process.env.KEY || "spotify2";
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, KEY, {
        expiresIn: "12h"
    });
};
exports.generateToken = generateToken;
const auth = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    let token;
    if (bearerHeader) {
        try {
            token = bearerHeader.split(" ")[1];
            req.userId = jsonwebtoken_1.default.verify(token, KEY).id;
            next();
        }
        catch (error) {
            return res.status(401).json({
                ok: false,
                data: error.message
            });
        }
    }
    else {
        next();
    }
};
exports.auth = auth;
