import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import type{Request, Response} from "express";
import redisClient from "../redis/client.redis.js";

dotenv.config();

export async function registerUser(req: Request, res: Response) {
    const {username, password} = req.body;
    const userWithSamerUsername = await User.findOne({username: username});
    if(userWithSamerUsername) {
        return res.status(400).json({
            status: 400,
            message: `User with same username exists`
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username: username,
        password: hashedPassword
    });
    await newUser.save();

    const key = process.env.SECRET_KEY;
    if(!key) {
        return res.status(400).json({
            status: 400,
            message: "Secret kety not found while registering"
        })
    }
    const token = jwt.sign({
        username: username
    }, key);
    res.cookie("AuthCookie", token);

    const userData = {
        id: newUser._id.toString(),
        username: newUser.username,
    };
    await redisClient.setEx(`user:1`, 60 * 60 * 1, JSON.stringify(userData));

    return res.status(201).json({
        status: 201,
        message: "User registered",
        user: newUser,
        toekn: token
    })
}

export async function loginUser(req: Request, res: Response) {
    const {username, password} = req.body;
    const data = await redisClient.get(`user:1`);
    if (data) {
        const parsed = JSON.parse(data);
        return res.status(200).json({
            data: parsed,
            source: "redis cache"
        });
    }
    const user = await User.findOne({
        username: username
    });
    if(!user) {
        return res.status(400).json({
            status: 400,
            message: "Username non existent"
        });
    }
    const key = process.env.SECRET_KEY;
    if(!key) {
        return res.status(400).json({
            status: 400,
            message: "Secret kety not found while login"
        })
    }
    const token = jwt.sign({
        username: username
    }, key);
    res.cookie("AuthCookie", token);
    return res.status(200).json({
        status: 201,
        message: "User logged in",
        user: user,
        toekn: token
    })
}

export async function logoutUser(req: Request, res: Response) {
    res.clearCookie("AuthCookie");
    return res.status(200).json({
        status: 200,
        message: "User logged oput and cookie deleted"
    });
}

export async function getProfile(req: Request & {
    user?: any
    }, 
    res: Response
) {
    const user = req.user;
    return res.status(200).json({
        status: 200,
        data: user
    })
}

