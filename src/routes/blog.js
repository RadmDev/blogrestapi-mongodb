import express from "express";
import { body } from "express-validator";
import {
  createBlogPost,
  deleteBlogPost,
  getAllBlogPost,
  getBlogPostById,
  updateBlogPost,
} from "../controllers/blog.js";

const router = express.Router();

// [POST] : /blog/post => create new blog post
router.post(
  "/post",
  [
    body("title").isLength({ min: 5 }).withMessage("input title min 5 char"),
    body("body").isLength({ min: 5 }).withMessage("input body min 5 char"),
  ],
  createBlogPost
);

// [PUT] : /blog/post/:postId => update single blog post
router.put(
  "/post/:postId",
  [
    body("title").isLength({ min: 5 }).withMessage("input title min 5 char"),
    body("body").isLength({ min: 5 }).withMessage("input body min 5 char"),
  ],
  updateBlogPost
);

// [GET] : /blog/posts => get all blog post
router.get("/posts", getAllBlogPost);

// [GET] : /blog/post/:postId => get single blog post
router.get("/post/:postId", getBlogPostById);

// [DELETE] : /blog/post/:postId => delete single blog post
router.delete("/post/:postId", deleteBlogPost);

export { router };
