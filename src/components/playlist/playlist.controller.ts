import { prisma } from "../../app";
import { Request, Response } from 'express';

export const create = async (req: Request, res: Response) => {
    try {
        if (req.userId){
            const { body } = req;
            const playlist = await prisma.playlist.create({
                data: {
                    name: body.name,
                    userId: req.userId
                }
            });
            res.status(201).json({
                ok: true,
                data: playlist,
            });
        } else {
            res.status(401).json({
                ok: false,
                data: "Please log in or sign up to create a playlist."
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            ok: false,
            data: error.message
        });
    }
};

export const findAll = async (req: Request, res: Response) => {
    try {
        console.log(req.userId);
        if (req.userId){
            const playlists = await prisma.playlist.findMany({
                where: {
                    userId: req.userId
                },
                include: { 
                    songs: true
                }
            });
            // const playlists_songs = playlists.map(async pl => {
            //     const songs = await prisma.song.findMany({
            //         where: {
            //             playlists: {
            //                 every: { id: pl.id}
            //             }
            //         }
            //     })
            //     return {
            //         id: pl.id,
            //         name: pl.name,
            //         userId: pl.userId,
            //         songs: songs
            //     }
            // });
            res.json({ 
                ok: true, 
                data: playlists
            });
        } else {
            res.status(401).json({
                ok: false,
                data: "Please log in or sign up to view your playlists."
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            ok: false,
            data: error.message,
        });
    }
};

export const findOne = async (req:Request, res: Response) => {
    try {
        if (req.userId){
            const playlist = await prisma.playlist.findFirst({
                where:{
                    id: parseInt(req.params.id),
                },
                include: {
                    songs: true
                }
            });
            if (playlist?.userId != req.userId){
                throw new Error("This is not your playlist.")
            }
            res.json({
                ok: true,
                data: playlist
            });
        } else {
            res.status(401).json({
                ok: false,
                data: "Please log in or sign up to view your playlists."
            });
        }
        const playlist = await prisma.playlist.findFirst({
            where:{
                id: parseInt(req.params.id),
            }
        });
        res.json({
            ok: true,
            data: playlist
        });
    } catch (error: any){
        return res.status(500).json({
            ok: false,
            data: error.message
        });
    }
}