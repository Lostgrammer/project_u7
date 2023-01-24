import { prisma } from "../../app";
import { Request, Response } from 'express';

export const create = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const playlist = await prisma.playlist.create({
            data: {
                ...body,
                //debe incluir el id del usuario actual
                //si no inicia sesion no puede hacer esto (401)
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
};

export const findAll = async (_req: Request, res: Response) => {
    try {
        const playlists = await prisma.playlist.findMany({
            //filtrar con el usuario de la sesion actual, si no hay retorna error
        });
        res.json({ ok: true, data: playlists });
    } catch (error: any) {
        return res.status(500).json({
            ok: false,
            data: error.message,
        });
    }
};

export const findOne =async (req:Request, res: Response) => {
    try {
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