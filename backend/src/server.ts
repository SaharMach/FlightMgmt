import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import http from "http"
import FlightRoutes from "./routes/FlightRoutes"
import { Server } from 'socket.io';
import { FlightRandomUpdate } from "./utils/FlightRandomUpdate"

dotenv.config()

const PORT = process.env.PORT || 3000
const DB = process.env.MONGO_DB!

const app = express()
const corsOpts = {
    origin:['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://localhost:3000', "https://flightmgmt.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}
app.use(cors(corsOpts))
app.use(bodyParser.json())

mongoose.connect(DB)
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error:", err))


app.use(FlightRoutes)

const server = http.createServer(app)
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('New client connected');
    FlightRandomUpdate(io);
    socket.on('disconnect', () => console.log('Client disconnected'));
  });
server.listen(PORT, () => console.log(`Server running on port http://127.0.0.1:${PORT}`))