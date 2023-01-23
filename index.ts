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


//rutas db
app.post("/author", async(req: Request,res: Response) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email
    }
  });
  res.json(user)
});

app.post("/post", async (req, res) => {
  const { title, content, author } = req.body;
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { id: author } },
    }
  });
  res.json(result)
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});


