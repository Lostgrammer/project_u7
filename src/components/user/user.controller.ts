import { prisma } from '../../app';
import { Request, Response } from 'express';
import { generateToken } from "../../middlewares/auth";

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
            data: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                date_born: newUser.date_born,
                last_session: newUser.last_session,
                token: generateToken(newUser.id)
            }
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
        let user = await prisma.user.findFirst({
            where: {
                email: body.email
            },
        });
        if (user && user.password == body.password) {
            const currentTime = new Date();
            user = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    last_session: 
                        currentTime.toISOString()
                        .replace(/\d\d:\d\d:\d\d/,currentTime.toLocaleTimeString())
                        
                }
            })
            res.status(200).json({
                ok: true,
                data: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    date_born: user.date_born,
                    last_session: user.last_session,
                    token: generateToken(user.id)
                }
            });
        } else {
            throw new Error("Invalid email or password");
        }
    } catch (error: any){
        return res.status(500).json({
            ok: false,
            data: error.message
        });
    }
};