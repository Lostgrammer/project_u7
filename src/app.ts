import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { router } from './router';

//Importando prisma client
import { PrismaClient } from '@prisma/client';

dotenv.config();

//iniciando prisma client
export const prisma = new PrismaClient();

export const app: Express = express();
app.use(express.json());

//crea las rutas
app.get('/', (_req:Request, res:Response) => {
    res.send('Express + TypeScript Server');
});
router(app);