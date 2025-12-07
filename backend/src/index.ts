import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRoute from "./routes/AuthRoute";
import PostRoute from "./routes/PostRoute";

dotenv.config()

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3001",
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 3000

app.use("/api/v1/auth", UserRoute)
app.use("/api/v1", PostRoute)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

