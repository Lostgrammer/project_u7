import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { prisma } from "../app"

if(process.env.NODE_ENV !== "production") dotenv.config();

const KEY = process.env.KEY || "spotify2";

export const generateToken = (id: number) => {
    return jwt.sign({ id }, KEY, {
        expiresIn: "12h"
    });
}

export const auth = (req: Request, res: Response, next: Function) => {
    const bearerHeader = req.headers.authorization;
    let token;
    if(bearerHeader){
        try {
            token = bearerHeader.split(" ")[1];
            req.userId = jwt.verify(token, KEY).id;
            next();
        } catch (error: any) {
            return res.status(401).json({
                ok: false,
                data: error.message
            });
        }
    } else {
        next();
    }
}