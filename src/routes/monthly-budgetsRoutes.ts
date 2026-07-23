// Dev Choksi


// Import Express tools
import { Router, Request, Response } from "express";

// Import database pool
import pool from "../db";

// Create route object
const router = Router();

// Get all budgets
router.get("/", async (_req: Request, res: Response) => {
  // Select budget rows
  const [rows] = await pool.query("SELECT * FROM monthly_budgets");

  // Send rows back
  res.json(rows);
});

// Add new budget
router.post("/", async (req: Request, res: Response) => {
  // Get body data
  const { student_id, month_name, year_number, planned_budget, notes } = req.body;

  // Insert new budget
  const [result]: any = await pool.query(
    // SQL insert command
    "INSERT INTO monthly_budgets (student_id, month_name, year_number, planned_budget, notes) VALUES (?, ?, ?, ?, ?)",

    // Safe query values
    [student_id, month_name, year_number, planned_budget, notes]
  );

  // Send created budget
  res.status(201).json({ budget_id: result.insertId, student_id, month_name, year_number, planned_budget, notes });
});

// Update budget id
router.put("/:id", async (req: Request, res: Response) => {
  // Get URL id
  const { id } = req.params;

  // Get body data
  const { student_id, month_name, year_number, planned_budget, notes } = req.body;

  // Update budget row
  const [result]: any = await pool.query(
    // SQL update command
    "UPDATE monthly_budgets SET student_id = ?, month_name = ?, year_number = ?, planned_budget = ?, notes = ? WHERE budget_id = ?",

    // Safe query values
    [student_id, month_name, year_number, planned_budget, notes, id]
  );

  // Check if missing
  if (result.affectedRows === 0) {
    // Send not found
    res.status(404).json({ error: "Monthly budget not found" });

    // Stop this route
    return;
  }

  // Send update message
  res.json({ message: "Monthly budget updated successfully" });
});

// Delete budget id
router.delete("/:id", async (req: Request, res: Response) => {
  // Get URL id
  const { id } = req.params;

  // Delete budget row
  const [result]: any = await pool.query(
    // SQL delete command
    "DELETE FROM monthly_budgets WHERE budget_id = ?",

    // Safe query value
    [id]
  );

  // Check if missing
  if (result.affectedRows === 0) {
    // Send not found
    res.status(404).json({ error: "Monthly budget not found" });

    // Stop this route
    return;
  }

  // Send delete message
  res.json({ message: "Monthly budget deleted successfully" });
});

// Export route file
export default router;