// Jasmine Kaur


// Import Express tools
import { Router, Request, Response } from "express";

// Import database pool
import pool from "../db";

// Create route object
const router = Router();

// Get all categories
router.get("/", async (_req: Request, res: Response) => {
  // Select category rows
  const [rows] = await pool.query("SELECT * FROM categories");

  // Send rows back
  res.json(rows);
});

// Add new category
router.post("/", async (req: Request, res: Response) => {
  // Get body data
  const { category_name, category_type } = req.body;

  // Check missing data
  if (!category_name || !category_type) {
    // Send bad request
    res.status(400).json({ error: "category_name and category_type are required" });

    // Stop this route
    return;
  }

  // Insert new category
  const [result]: any = await pool.query(
    // SQL insert command
    "INSERT INTO categories (category_name, category_type) VALUES (?, ?)",

    // Safe query values
    [category_name, category_type]
  );

  // Send created category
  res.status(201).json({ category_id: result.insertId, category_name, category_type });
});

// Update category by id
router.put("/:id", async (req: Request, res: Response) => {
  // Get URL id
  const { id } = req.params;

  // Get body data
  const { category_name, category_type } = req.body;

  // Update category row
  const [result]: any = await pool.query(
    // SQL update command
    "UPDATE categories SET category_name = ?, category_type = ? WHERE category_id = ?",

    // Safe query values
    [category_name, category_type, id]
  );

  // Check if missing
  if (result.affectedRows === 0) {
    // Send not found
    res.status(404).json({ error: "Category not found" });

    // Stop this route
    return;
  }

  // Send update message
  res.json({ message: "Category updated successfully" });
});

// Delete category by id
router.delete("/:id", async (req: Request, res: Response) => {
  // Get URL id
  const { id } = req.params;

  // Delete category row
  const [result]: any = await pool.query(
    // SQL delete command
    "DELETE FROM categories WHERE category_id = ?",

    // Safe query value
    [id]
  );

  // Check if missing
  if (result.affectedRows === 0) {
    // Send not found
    res.status(404).json({ error: "Category not found" });

    // Stop this route
    return;
  }

  // Send delete message
  res.json({ message: "Category deleted successfully" });
});

// Export route file
export default router;