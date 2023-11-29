import cors from "cors";
import express from "express";
import { router as authRoutes } from "./src/routes/auth.js";
import { router as productRoutes } from "./src/routes/products.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/", productRoutes);

app.listen(4000);
