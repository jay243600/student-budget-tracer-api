# Student Budget Tracker API........!!!!!!!!!!!!!!!!!!!!!!!!

## Group Members

- Dev Choksi
- Jay Dabhi
- Jasmine Kaur

## Project Description...............!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Student Budget Tracker API is a REST API project where students can track their monthly budget. Students can record their income and expenses, monthly budget, categories and savings goals. The value of this project is that students must handle rent, food, transportation, bills, school fees, and from part-time jobs. The API saves this information in MySQL database and provides the data in JSON format to the frontend.

## Technologies Used...........!!!!!!!!!!!!!!!!!!!!!!!

- Node.js
- TypeScript
- Express.js
- MySQL
- mysql2
- cors

## Project Structure.................!!!!!!!!!!!!!!!!!!

STUDENT_BUDGET_TRACKER
  database.sql
  package.json
  package-lock.json
  tsconfig.json
  src
    index.ts
    db.ts
    routes
      studentRoutes.ts
      categoriesRoutes.ts
      transactionsRoutes.ts
      monthlyBudgetRoutes.ts
      savingsGoalRoutes.ts