// Dev Choksi

// Import Express tools
import { Router, Request, Response } from "express";

// Import bcrypt tool
import bcrypt from "bcrypt";

// Import JWT tool
import jwt from "jsonwebtoken";

// Import database pool
import pool from "../db";

// Create route object
const router = Router();

// Secret token key
const JWT_SECRET = "student_budget_secret";

// Register new student
router.post("/register", async (req: Request, res: Response) => {
  try {
    // Get body data
    const { full_name, email, college_name, password } = req.body;

    // Check missing data
    if (!full_name || !email || !password) {
      res.status(400).json({ error: "full_name, email, and password are required" });
      return;
    }

    // Check existing email
    const [existingStudent]: any = await pool.query(
      "SELECT * FROM students WHERE email = ?",
      [email]
    );

    // Stop duplicate email
    if (existingStudent.length > 0) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    // Hash user password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert new student
    const [result]: any = await pool.query(
      "INSERT INTO students (full_name, email, college_name, password_hash) VALUES (?, ?, ?, ?)",
      [full_name, email, college_name, password_hash]
    );

    // Send created student
    res.status(201).json({
      student_id: result.insertId,
      full_name,
      email,
      college_name
    });
  } catch (error) {
    // Show real error
    console.log(error);

    // Send server error
    res.status(500).json({ error: "Register failed" });
  }
});

// Login student
router.post("/login", async (req: Request, res: Response) => {
  try {
    // Get body data
    const { email, password } = req.body;

    // Check missing data
    if (!email || !password) {
      res.status(400).json({ error: "email and password are required" });
      return;
    }

    // Find student email
    const [rows]: any = await pool.query(
      "SELECT * FROM students WHERE email = ?",
      [email]
    );

    // Check student exists
    if (rows.length === 0) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    // Get first student
    const student = rows[0];

    // Check password saved
    if (!student.password_hash) {
      res.status(400).json({ error: "This student has no password. Please register first." });
      return;
    }

    // Compare password hash
    const passwordMatch = await bcrypt.compare(password, student.password_hash);

    // Check password match
    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    // Create login token
    const token = jwt.sign(
      { student_id: student.student_id, email: student.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send login token
    res.json({
      message: "Login successful",
      token
    });
  } catch (error) {
    // Show real error
    console.log(error);

    // Send server error
    res.status(500).json({ error: "Login failed" });
  }
});

// Export route file
export default router;