// Jay Dabhi


// Import Express tools
import { Router, Request, Response } from "express";

// Import database pool
import pool from "../db";

// Create route object
const router = Router();

// Get all students
router.get("/", async (_req: Request, res: Response) => {
  // Select student rows
  const [rows] = await pool.query("SELECT * FROM students");

  // Send rows back
  res.json(rows);
});

// Add new student
router.post("/", async (req: Request, res: Response) => {
  // Get body data
  const { full_name, email, college_name } = req.body;

  // Check missing data
  if (!full_name || !email) {
    // Send bad request
    res.status(400).json({ error: "full_name and email are required" });

    // Stop this route
    return;
  }

  // Insert new student
  const [result]: any = await pool.query(
    // SQL insert command
    "INSERT INTO students (full_name, email, college_name) VALUES (?, ?, ?)",

    // Safe query values
    [full_name, email, college_name]
  );

  // Send created student
  res.status(201).json({ student_id: result.insertId, full_name, email, college_name });
});

// Update student by id
router.put("/:id", async (req: Request, res: Response) => {
  // Get URL id
  const { id } = req.params;

  // Get body data
  const { full_name, email, college_name } = req.body;

  // Update student row
  const [result]: any = await pool.query(
    // SQL update command
    "UPDATE students SET full_name = ?, email = ?, college_name = ? WHERE student_id = ?",

    // Safe query values
    [full_name, email, college_name, id]
  );

  // Check if missing
  if (result.affectedRows === 0) {
    // Send not found
    res.status(404).json({ error: "Student not found" });

    // Stop this route
    return;
  }

  // Send update message
  res.json({ message: "Student updated successfully" });
});

// Delete student by id
router.delete("/:id", async (req: Request, res: Response) => {
  // Get URL id
  const { id } = req.params;

  // Delete student row
  const [result]: any = await pool.query(
    // SQL delete command
    "DELETE FROM students WHERE student_id = ?",

    // Safe query value
    [id]
  );

  // Check if missing
  if (result.affectedRows === 0) {
    // Send not found
    res.status(404).json({ error: "Student not found" });

    // Stop this route
    return;
  }

  // Send delete message
  res.json({ message: "Student deleted successfully" });
});

// Export route file
export default router;