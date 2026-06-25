import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const type = req.query.type;

  if (type) {
    const [rows] = await pool.query(
      "SELECT * FROM transactions WHERE transaction_type = ?",
      [type]
    );
    res.json(rows);
    return;
  }

  const [rows] = await pool.query("SELECT * FROM transactions");
  res.json(rows);
});

export default router;