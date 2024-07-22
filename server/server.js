import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import  cookieParser from "cookie-parser"
import connectDb from "./config/dbConnection.js"
 

dotenv.config()
connectDb()
const app = express()
app.use(express.json()) //bodyparser
app.use(cookieParser())
const port = process.env.PORT || 8000


app.listen(port, () => {
  console.log(`server running on port ${port}`)
})