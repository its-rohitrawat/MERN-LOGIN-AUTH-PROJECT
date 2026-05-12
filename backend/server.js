import dotenv from "dotenv";
dotenv.config({ quite: true });

import express from "express";
import { connectDB } from "./config/database.js";
import userRoutes from "./routes/user-routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 9000;

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  }),
);

app.use(express.json());
app.use("/v1/api", userRoutes);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("server connected");
});
