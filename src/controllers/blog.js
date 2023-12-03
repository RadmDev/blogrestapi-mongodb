import { validationResult } from "express-validator";
import fs from "fs";
import path from "path";
import BlogPost from "../models/blog.js";

export const createBlogPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Invalid Value");
      err.errorStatus = 400;
      err.data = errors.array();
      throw err;
    }

    if (!req.file) {
      const err = new Error("Image Harus di Upload");
      err.errorStatus = 422;
      throw err;
    }

    const { title, body } = req.body;
    const image = req.file.path;

    const Posting = new BlogPost({
      title,
      body,
      image,
      author: {
        uid: 1,
        name: "Anggarizki",
      },
    });

    const result = await Posting.save();

    res.status(201).json({
      message: "Create Blog Post Success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllBlogPost = async (req, res, next) => {
  try {
    const result = await BlogPost.find();

    res.status(200).json({
      message: "Data Blog Post Berhasil Dipanggil",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getBlogPostById = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const result = await BlogPost.findById(postId);

    if (!result) {
      const err = new Error("Blog Post Tidak Ditemukan");
      err.errorStatus = 404;
      throw err;
    }

    res.status(200).json({
      message: "Data Blog Post Berhasil Dipanggil",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBlogPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Invalid Value");
      err.errorStatus = 400;
      err.data = errors.array();
      throw err;
    }

    if (!req.file) {
      const err = new Error("Image Harus di Upload");
      err.errorStatus = 422;
      throw err;
    }

    const { title, body } = req.body;
    const image = req.file.path;
    const { postId } = req.params;

    const post = await BlogPost.findById(postId);

    if (!post) {
      const err = new Error("Blog Post Tidak Ditemukan");
      err.errorStatus = 404;
      throw err;
    }

    post.title = title;
    post.body = body;
    post.image = image;

    const updatedPost = await post.save();

    res.status(200).json({
      message: "Update Blog Post Berhasil",
      data: updatedPost,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBlogPost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await BlogPost.findById(postId);

    if (!post) {
      const err = new Error("Blog Post Tidak Ditemukan");
      err.errorStatus = 404;
      throw err;
    }

    // Remove Image
    removeImage(post.image);

    // Remove Post
    const removedPost = await BlogPost.findOneAndDelete({ _id: postId });

    res.status(200).json({
      message: "Hapus Blog Post Berhasil",
      data: { _id: removedPost._id }, // Mengambil _id dari post yang dihapus
    });
  } catch (err) {
    next(err);
  }
};

// Remove Image
const removeImage = (filePath) => {
  // mengambil path file(lokasi gambar)
  filePath = path.resolve(filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
