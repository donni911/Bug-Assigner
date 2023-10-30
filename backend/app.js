import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bugsRouter from "./routes/bugRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/bugs", bugsRouter);

export default app;
