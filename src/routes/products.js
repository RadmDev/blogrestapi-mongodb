import express from "express";
import { createProduct, getAllProducts } from "../controllers/products.js";

const router = express.Router();

// Create
router.post("/products", createProduct);

// Read
// 1. Get all products
router.get("/products", getAllProducts);

// Update

// Delete

export { router };
