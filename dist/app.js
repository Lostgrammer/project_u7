"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = require("./router");
//Importando prisma client
const client_1 = require("@prisma/client");
dotenv_1.default.config();
//iniciando prisma client
exports.prisma = new client_1.PrismaClient();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
//crea las rutas
exports.app.get('/', (_req, res) => {
    res.send('Express + TypeScript Server');
});
(0, router_1.router)(exports.app);
