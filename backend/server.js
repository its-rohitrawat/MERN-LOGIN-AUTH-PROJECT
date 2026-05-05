import dotenv from "dotenv"
dotenv.config({quite : true})

import express from 'express';
import {connectDB} from "./config/database.js"
import userRoutes from "./routes/user-routes.js"


const app = express();
PORT = process.env.PORT || 8000;

connectDB()

app.use(express.json())
app.use("/v1/api", userRoutes)

app.listen(PORT, (err)=> {
    if(err) console.log(err)
        console.log("server connected");
})