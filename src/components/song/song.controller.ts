import { prisma } from "../../app";
import { Request, Response } from 'express';

export const findAll = async (_req: Request, res: Response) => {
    try {
        const songs = await prisma.song.findMany();
        if (req.user) res.json({ ok: true, data: songs });
        else res.json({ ok: true, data: songs.filter(song => !song.isPublic) });
    } catch (error: any) {
        return res.status(500).json({
            ok: false,
            data: error.message,
        });
    }
};

export const findOne =async (req: Request, res: Response) => {
    try {
        if (req.user) {
            const song = await prisma.song.findFirst({
                where: {
                    id: parseInt(req.params.id),
                }
            });
            res.json({
                ok: true,
                data: song
            });
        } else {
            
        }
    } catch (error: any){
        return res.status(500).json({
            ok: false,
            data: error.message
        });
    }
}

export const create = async (req:any, res: Response) => {
    try {
        const { body } = req;
        const user = await prisma.user.findFirst({
            where: {
                id: body.user
            }
        })
        console.log(body);
        if(user && user.email == "admin@admin.com"){
            const newSong = await prisma.song.create({
                data: {
                    name: body.name,
                    artist: body.artist,
                    album: body.album,
                    year: body.year,
                    genre: body.genre,
                    duration: body.duration,
                    isPublic: body.isPublic
                }
            });
            res.status(201).json({
                ok: true,
                data: newSong,
            });
        } else {
            res.status(403).json({
                ok: false,
                data: "Creation not allowed",
            });
        }
        
    } catch (error: any) {
        return res.status(500).json({
            ok: false,
            data: error.message
        });
    }
}