import { prisma } from '../../app';
import { Request, Response } from 'express'

export const registerUser =async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const newUser = await prisma.user.create({
            data:{
                ...body,
            }
        });
        res.status(201).json({
            ok: true,
            data: newUser,
        });
    } catch (error: any){
        return res.status(500).json({
            ok: false,
            data: error.message
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                AND: {
                    password: body.password,
                }
            },
        });
        res.status(200).json({
            ok: true,
            data: user
        });
    } catch (error: any){
        return res.status(500).json({
            ok: false,
            data: error.message
        });
    }
};