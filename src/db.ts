import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Cdev@19!09",
  database: "student_budget_tracker"
});

export default pool;