// Dev Choksi

// Import Express types
import { Request, Response, NextFunction } from "express";

// Import JWT tool
import jwt from "jsonwebtoken";

// Secret token key
const JWT_SECRET = "student_budget_secret";

// Check login token
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Get auth header
  const authHeader = req.headers.authorization;

  // Check header exists
  if (!authHeader) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  // Get token value
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Save user data
    (req as any).user = decoded;

    // Continue request
    next();
  } catch (error) {
    // Send unauthorized
    res.status(401).json({ error: "Invalid token" });
  }
}