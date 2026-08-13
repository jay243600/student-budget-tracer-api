// Dev Choksi

// Import Express
import express from "express";

// Import CORS
import cors from "cors";

// Import student routes
import studentRoutes from "./routes/studentRoutes";

// Import transaction routes
import transactionsRoutes from "./routes/transactionsRoutes";

// Import category routes
import categoriesRoutes from "./routes/categoriesRoutes";

// Import budget routes
import monthlyBudgetRoutes from "./routes/monthly-budgetsRoutes";

// Import savings routes
import savingsGoalRoutes from "./routes/savings-goalsRoutes";

// Import auth routes
import authRoutes from "./routes/authRoutes";

// Import auth middleware
import { authMiddleware } from "./middleware/authMiddleware";

// Create Express app
const app = express();

// Set server port
const PORT = 3001;

// Allow frontend access
app.use(cors());

// Read JSON body
app.use(express.json());

// Basic home route
app.get("/", (_req, res) => {
  // Send API message
  res.send("Student Budget Tracker API is running");
});

// Public auth routes
app.use("/auth", authRoutes);

// Protected student routes
app.use("/students", authMiddleware, studentRoutes);

// Protected transaction routes
app.use("/transactions", authMiddleware, transactionsRoutes);

// Protected category routes
app.use("/categories", authMiddleware, categoriesRoutes);

// Protected budget routes
app.use("/monthly-budgets", authMiddleware, monthlyBudgetRoutes);

// Protected savings routes
app.use("/savings-goals", authMiddleware, savingsGoalRoutes);

// Start the server
app.listen(PORT, () => {
  // Show server link
  console.log(`Server running at http://localhost:${PORT}`);
});