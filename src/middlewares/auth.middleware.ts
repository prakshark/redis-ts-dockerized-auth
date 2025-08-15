import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function protectRoute(
    req: Request  & { 
        cookies: { [key: string]: string },
        user?:any
    }, 
    res: Response, 
    next: NextFunction
) {
    const token = req.cookies.AuthCookie;
    if(!token) {
        return res.status(400).json({
            status: 400,
            message: "cookie not provided in middleware"
        })
    }
    const key = process.env.SECRET_KEY;
    if(!key) {
        return res.status(400).json({
            status: 400,
            message: "key not provided in middleware"
        })
    }
    const decoded = jwt.verify(token, key);

    req.user = decoded;
    next();
}