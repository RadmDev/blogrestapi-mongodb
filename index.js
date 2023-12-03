import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { router as authRoutes } from "./src/routes/auth.js";
import { router as blogRoutes } from "./src/routes/blog.js";

const app = express();
dotenv.config();

const PORT = process.env.LOCAL_PORT || 4000;
const DB_USER = process.env.MONGODB_ATLAS_AUTH_USER;
const DB_PASS = process.env.MONGODB_ATLAS_AUTH_PASSWORD;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json());
app.use("/images", express.static(path.join(path.resolve(), "images")));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(cors());

app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);

app.use((error, req, res, next) => {
  res.status(error.errorStatus || 500).json({
    message: error.message,
    data: error.data,
  });
});

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.lk1y7gf.mongodb.net/blog?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT, () =>
      console.log(`COnnection success, server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log(err));
