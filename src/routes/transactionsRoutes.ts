// Dev Choksi


// Import Express tools
import { Router, Request, Response } from "express";

// Import database pool
import pool from "../db";

// Create route object
const router = Router();

// Get all transactions
router.get("/", async (req: Request, res: Response) => {
  // Get query type
  const type = req.query.type;

  // Check type exists
  if (type) {
    // Select filtered rows
    const [rows] = await pool.query(
      // SQL select command
      "SELECT * FROM transactions WHERE transaction_type = ?",

      // Safe query value
      [type]
    );

    // Send rows back
    res.json(rows);

    // Stop this route
    return;
  }

  // Select transaction rows
  const [rows] = await pool.query("SELECT * FROM transactions");

  // Send rows back
  res.json(rows);
});

// Add new transaction
router.post("/", async (req: Request, res: Response) => {
  // Get body data
  const { student_id, category_id, amount, transaction_type, transaction_date, description } = req.body;

  // Check missing data
  if (!student_id || !category_id || !amount || !transaction_type || !transaction_date) {
    // Send bad request
    res.status(400).json({ error: "student_id, category_id, amount, transaction_type, and transaction_date are required" });

    // Stop this route
    return;
  }

  // Insert new transaction
  const [result]: any = await pool.query(
    // SQL insert command
    "INSERT INTO transactions (student_id, category_id, amount, transaction_type, transaction_date, description) VALUES (?, ?, ?, ?, ?, ?)",

    // Safe query values
    [student_id, category_id, amount, transaction_type, transaction_date, description]
  );

  // Send created transaction
  res.status(201).json({ transaction_id: result.insertId, student_id, category_id, amount, transaction_type, transaction_date, description });
});

// Update transaction id
router.put("/:id", async (req: Request, res: Response) => {
  // Get URL id
  const { id } = req.params;

  // Get body data
  const { student_id, category_id, amount, transaction_type, transaction_date, description } = req.body;

  // Update transaction row
  const [result]: any = await pool.query(
    // SQL update command
    "UPDATE transactions SET student_id = ?, category_id = ?, amount = ?, transaction_type = ?, transaction_date = ?, description = ? WHERE transaction_id = ?",

    // Safe query values
    [student_id, category_id, amount, transaction_type, transaction_date, description, id]
  );

  // Check if missing
  if (result.affectedRows === 0) {
    // Send not found
    res.status(404).json({ error: "Transaction not found" });

    // Stop this route
    return;
  }

  // Send update message
  res.json({ message: "Transaction updated successfully" });
});

// Delete transaction id
router.delete("/:id", async (req: Request, res: Response) => {
  // Get URL id
  const { id } = req.params;

  // Delete transaction row
  const [result]: any = await pool.query(
    // SQL delete command
    "DELETE FROM transactions WHERE transaction_id = ?",

    // Safe query value
    [id]
  );

  // Check if missing
  if (result.affectedRows === 0) {
    // Send not found
    res.status(404).json({ error: "Transaction not found" });

    // Stop this route
    return;
  }

  // Send delete message
  res.json({ message: "Transaction deleted successfully" });
});

// Export route file
export default router;