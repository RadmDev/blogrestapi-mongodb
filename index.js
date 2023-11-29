import cors from "cors";
import express from "express";
import { router as authRoutes } from "./src/routes/auth.js";
import { router as blogRoutes } from "./src/routes/blog.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);

app.listen(4000);
