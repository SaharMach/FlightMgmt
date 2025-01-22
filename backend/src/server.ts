import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import http from "http"
import flightRoutes from "./routes/flightRoutes"

dotenv.config()

const PORT = process.env.PORT || 3000
const DB = process.env.MONGO_DB!

const app = express()
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(DB)
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error:", err))


app.use(flightRoutes)

const server = http.createServer(app)


server.listen(PORT, () => console.log(`Server running on port http://127.0.0.1:${PORT}`))