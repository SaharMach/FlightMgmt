import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI!;

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(DB_URI)
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error:", err));


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));