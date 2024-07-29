import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import  cookieParser from "cookie-parser"
import connectDb from "./config/dbConnection.js"
import router from "./router/usersRoutes.js"
 

dotenv.config()
connectDb()
const port = process.env.PORT || 8000
const app = express()

app.use(cors({
  origin: [process.env.ORIGIN],
  methods: ["GET","POST","PUT","PATCH","DELETE"],
  credentials: true
})) //enable cors
app.use(express.json()) //bodyparser
app.use(cookieParser())

app.use("/api/users", router)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})