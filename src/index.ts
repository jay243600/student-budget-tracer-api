import express from "express";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes";
import transactionsRoutes from "./routes/transactionsRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";
import monthlyBudgetRoutes from "./routes/monthly-budgetsRoutes";
import savingsGoalRoutes from "./routes/savings-goalsRoutes";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Student Budget Tracker API is running");
});

app.use("/students", studentRoutes);
app.use("/transactions", transactionsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/monthly-budgets", monthlyBudgetRoutes);
app.use("/savings-goals", savingsGoalRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});