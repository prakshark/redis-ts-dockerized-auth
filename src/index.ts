import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/db.js";
import authRoutes from "./routes/auth.routes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

async function startServer() {
    try {
        const PORT = process.env.PORT;
        connectDB()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Server listening at port ${PORT}`);
            })
        })
    } catch (error) {
        console.error(`Error initialising the express server`);
    }
}

startServer();