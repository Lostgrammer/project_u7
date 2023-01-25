import { prisma } from "../../app";
import { Request, Response } from 'express';

export const findAll = async (req: Request, res: Response) => {
    try {
        const songs = await prisma.song.findMany();
        if (req.userId) res.json({ ok: true, data: songs });
        else res.json({ ok: true, data: songs.filter(song => song.isPublic) });
    } catch (error: any) {
        return res.status(500).json({
            ok: false,
            data: error.message,
        });
    }
};

export const findOne =async (req: Request, res: Response) => {
    try {
        const song = await prisma.song.findFirst({
            where: {
                id: parseInt(req.params.id),
            }
        });
        if (!req.userId && !song?.isPublic) {
            res.status(401).json({
                ok: false,
                data: "Song is not public. Please log in."
            });
        } else {
            res.json({
                ok: true,
                data: {
                    name: song?.name,
                    artist: song?.artist,
                    album: song?.album,
                    year: song?.year,
                    genre: song?.genre,
                    duration: song?.duration
                } 
            });
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
                id: req.userId
            }
        })
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

export const toPlaylist = async (req: Request, res: Response) => {
    try {
        if (!req.userId){
            res.status(401).json({
                ok: false,
                data: "Please log in or sign up to create a playlist."
            });
            return;
        }
        const { body } = req;
        if (!(body.songId && (body.playlistId? !body.playlistName:body.playlistName))){
            res.status(400).json({
                ok: false,
                data: "Please enter a songId, and a playlistId or playlistName "
            });
            return;
        }
        let playlist;
        if (body.playlistId) {
            playlist = await prisma.playlist.update({
                where: { id: body.playlistId },
                data: {
                    songs: { connect: { id: body.songId }}
                }
            });
        } else {
            playlist = await prisma.playlist.create({
                data: {
                    name: body.playlistName,
                    userId: req.userId,
                    songs: {
                        connect: { id: body.songId }
                    }
                }
            });
        }
        playlist= await prisma.playlist.findFirst({
            where:{
                id: playlist.id,
            },
            include: {
                songs: true
            }
        });
        res.status(201).json({
            ok: true,
            data: playlist,
        });
    } catch (error: any) {
        return res.status(500).json({
            ok: false,
            data: error.message
        });
    }
}