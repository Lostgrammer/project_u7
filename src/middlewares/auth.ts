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
            req.user = jwt.verify(token, KEY);
            next();
        } catch (error) {
            return res.status(401).send("Invalid token");
        }
    }
    if(!token){
        return res.status(401).send("No token");
    }
}