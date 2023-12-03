import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: { type: String, required: true },
    image: { type: String, required: true },
    author: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;
