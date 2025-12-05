import express from "express"
import dotenv from "dotenv"
import UserRoute from "./routes/AuthRoute";

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.use("/api/auth", UserRoute)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

