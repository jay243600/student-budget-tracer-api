// Jay Dabhi 


// Import Express tools
import { Router, Request, Response } from "express";

// Import database pool
import pool from "../db";

// Create route object
const router = Router();

// Get all goals
router.get("/", async (_req: Request, res: Response) => {
  // Select goal rows
  const [rows] = await pool.query("SELECT * FROM savings_goals");

  // Send rows back
  res.json(rows);
});

// Add new goal
router.post("/", async (req: Request, res: Response) => {
  // Get body data
  const { student_id, goal_name, target_amount, saved_amount, target_date } = req.body;

  // Insert new goal
  const [result]: any = await pool.query(
    // SQL insert command
    "INSERT INTO savings_goals (student_id, goal_name, target_amount, saved_amount, target_date) VALUES (?, ?, ?, ?, ?)",

    // Safe query values
    [student_id, goal_name, target_amount, saved_amount, target_date]
  );

  // Send created goal
  res.status(201).json({ goal_id: result.insertId, student_id, goal_name, target_amount, saved_amount, target_date });
});

// Update goal id
router.put("/:id", async (req: Request, res: Response) => {
  // Get URL id
  const { id } = req.params;

  // Get body data
  const { student_id, goal_name, target_amount, saved_amount, target_date } = req.body;

  // Update goal row
  const [result]: any = await pool.query(
    // SQL update command
    "UPDATE savings_goals SET student_id = ?, goal_name = ?, target_amount = ?, saved_amount = ?, target_date = ? WHERE goal_id = ?",

    // Safe query values
    [student_id, goal_name, target_amount, saved_amount, target_date, id]
  );

  // Check if missing
  if (result.affectedRows === 0) {
    // Send not found
    res.status(404).json({ error: "Savings goal not found" });

    // Stop this route
    return;
  }

  // Send update message
  res.json({ message: "Savings goal updated successfully" });
});

// Delete goal id
router.delete("/:id", async (req: Request, res: Response) => {
  // Get URL id
  const { id } = req.params;

  // Delete goal row
  const [result]: any = await pool.query(
    // SQL delete command
    "DELETE FROM savings_goals WHERE goal_id = ?",

    // Safe query value
    [id]
  );

  // Check if missing
  if (result.affectedRows === 0) {
    // Send not found
    res.status(404).json({ error: "Savings goal not found" });

    // Stop this route
    return;
  }

  // Send delete message
  res.json({ message: "Savings goal deleted successfully" });
});

// Export route file
export default router;