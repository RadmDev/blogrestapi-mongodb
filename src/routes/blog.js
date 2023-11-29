import express from "express";
import { body } from "express-validator";
import { createBlogPost } from "../controllers/blog.js";

const router = express.Router();

router.post(
  "/post",
  [
    body("title").isLength({ min: 5 }).withMessage("input title min 5 char"),
    body("body").isLength({ min: 5 }).withMessage("input body min 5 char"),
  ],
  createBlogPost
);

export { router };
