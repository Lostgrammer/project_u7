import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

//Importando prisma client
import { PrismaClient } from '@prisma/client';

dotenv.config();

//iniciando prisma client
const prisma = new PrismaClient();

const app: Express = express();
const PORT = process.env.PORT ||3000;

app.use(express.json());

app.get('/', (req:Request, res:Response) => {
  res.send('Proyecto de la unidad 7');
});

//añadiendo cancion
app.post("/api/v1/songs", async (req: Request, res: Response) => {
  const { name, artist, album, year, genre, duration } = req.body;
  const result = await prisma.song.create({
    data: {
      name: name,
      artist: artist,
      album: album,
      year: year,
      genre: genre,
      duration: duration
    } 
  });
  res.json(result)
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
