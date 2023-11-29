import express from "express";
import { createBlogPost } from "../controllers/blog.js";

const router = express.Router();

router.post("/post", createBlogPost);

export { router };
