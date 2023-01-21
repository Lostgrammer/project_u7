import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (_req: Request, res: Response): Promise<void> => {
    try{
        const playlists = await prisma.playlist.findMany({
            include: { song:true},
        });

        res.status(200).json({
            ok: true,
            data:playlists,
        });
    } catch(error){
        res.status(500).json({ok:false, message: error});
    }
};

export const store = async (req:Request, res: Response): Promise<void> =>{
    try {
        const {name, song, user} = req.body;

        await prisma.playlist.create({data: {
            name,
            user: { connect: {id:user}},
            song: { connect: {id:song}},            
        },
    }),

        res.status(201).json({ok:true, message: "Playlist creado correctamente"})
    } catch(error){
        console.log(error);
        res.status(500).json({ok:false, message:error});
    }
}
