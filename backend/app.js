import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bugsRouter from "./routes/bugRoutes.js";
import projectRouter from "./routes/projectRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/bugs", bugsRouter);
app.use("/api/projects", projectRouter);

export default app;
