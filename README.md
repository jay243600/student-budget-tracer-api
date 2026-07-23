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


## Milestone 4.................!!!!!!!!!!!!!!!!!!!!

In Milestone 4, we continued the Student Budget Tracker API and added full CRUD operations. Now the backend can create, read, update, and delete data from the MySQL database.

CRUD means:

- POST is used to create new data
- GET is used to read data
- PUT is used to update existing data by id
- DELETE is used to remove data by id

## Milestone 4 Routes Added.................!!!!!!!!!!!!!!!!!!!!

| Method | Route | Purpose |
|---|---|---|
| GET | /students | Get all students |
| POST | /students | Add a new student |
| PUT | /students/:id | Update a student |
| DELETE | /students/:id | Delete a student |
| GET | /categories | Get all categories |
| POST | /categories | Add a new category |
| PUT | /categories/:id | Update a category |
| DELETE | /categories/:id | Delete a category |
| GET | /transactions | Get all transactions |
| POST | /transactions | Add a new income or expense record |
| PUT | /transactions/:id | Update a transaction |
| DELETE | /transactions/:id | Delete a transaction |
| GET | /monthly-budgets | Get all monthly budgets |
| POST | /monthly-budgets | Add a new monthly budget |
| PUT | /monthly-budgets/:id | Update a monthly budget |
| DELETE | /monthly-budgets/:id | Delete a monthly budget |
| GET | /savings-goals | Get all savings goals |
| POST | /savings-goals | Add a new savings goal |
| PUT | /savings-goals/:id | Update a savings goal |
| DELETE | /savings-goals/:id | Delete a savings goal |

## Database Connection.............!!!!!!!!!!!!!!!!!

The API routes are connected with MySQL database tables.

| Route File | Database Table |
|---|---|
| studentRoutes.ts | students |
| categoriesRoutes.ts | categories |
| transactionsRoutes.ts | transactions |
| monthlyBudgetRoutes.ts | monthly_budgets |
| savingsGoalRoutes.ts | savings_goals |

The backend uses parameterized SQL queries with `?` to safely send data to MySQL.

## Team Work Breakdown For Milestone 4............!!!!!!!!!!!!!!!

### Dev Choksi

- Worked on transactions routes
- Worked on monthly budget routes
- Tested POST, PUT, and DELETE in Bruno
- Helped plan backend CRUD structure

### Jay Dabhi

- Worked on student routes
- Worked on savings goal routes
- Tested student and savings goal APIs in Bruno

### Jasmine Kaur

- Worked on category routes
- Tested category API in Bruno
- Explained how categories connect with transactions
