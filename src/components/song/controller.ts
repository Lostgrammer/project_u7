import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (_req: Request, res: Response): Promise<void> => {
    try{
        const songs = await prisma.song.findMany();

        res.status(200).json({
            ok: true,
            data:songs,
        });
    } catch(error){        
        res.status(500).json({ok:false, message: error});
    }
};

export const store = async (req:Request, res: Response): Promise<void> =>{
    try {
        const {name, artist, album, year, genre, duration} = req.body;

        await prisma.song.create({data: {
            name,
            artist,
            album, 
            year: new Date(year), 
            genre, 
            duration}});

        res.status(201).json({ok:true, message: "Cancion creada correctamente"})
    } catch(error){
        console.log(error)
        res.status(500).json({ok:false, message:error});
    }
}