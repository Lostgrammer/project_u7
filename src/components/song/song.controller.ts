import { prisma } from "../../app";
import { Request, Response } from 'express';

export const findAll = async (_req: Request, res: Response) => {
    try {
        const songs = await prisma.song.findMany();
        res.json({ ok: true, data: songs });
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
        res.json({
            ok: true,
            data: song
        });
    } catch (error: any){
        return res.status(500).json({
            ok: false,
            data: error.message
        });
    }
}