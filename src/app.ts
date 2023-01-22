import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

//Importando prisma client
import { PrismaClient } from '@prisma/client';

dotenv.config();

//iniciando prisma client
export const prisma = new PrismaClient();

export const app: Express = express();

app.use(express.json());
app.get('/', (_req:Request, res:Response) => {
    res.send('Express + TypeScript Server');
});
