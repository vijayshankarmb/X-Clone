import express from "express"
import dotenv from "dotenv"
import UserRoute from "./routes/AuthRoute";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 3000

app.use("/api/auth", UserRoute)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

