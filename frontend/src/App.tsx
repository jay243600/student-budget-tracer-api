// Import React state
import { useState } from "react";

// Import CSS file
import "./App.css";

// Backend base URL
const API_URL = "http://localhost:3001";

// API route settings
const apiOptions: any = {
  // Students API setup
  Students: {
    // Students route path
    path: "/students",
    // Student id name
    idField: "student_id",
    // Student input fields
    fields: ["full_name", "email", "college_name"],
  },

  // Categories API setup
  Categories: {
    // Categories route path
    path: "/categories",
    // Category id name
    idField: "category_id",
    // Category input fields
    fields: ["category_name", "category_type"],
  },

  // Transactions API setup
  Transactions: {
    // Transactions route path
    path: "/transactions",
    // Transaction id name
    idField: "transaction_id",
    // Transaction input fields
    fields: [
      "student_id",
      "category_id",
      "amount",
      "transaction_type",
      "transaction_date",
      "description",
    ],
  },

  // Monthly budgets setup
  "Monthly Budgets": {
    // Budgets route path
    path: "/monthly-budgets",
    // Budget id name
    idField: "budget_id",
    // Budget input fields
    fields: ["student_id", "month_name", "year_number", "planned_budget", "notes"],
  },

  // Savings goals setup
  "Savings Goals": {
    // Goals route path
    path: "/savings-goals",
    // Goal id name
    idField: "goal_id",
    // Goal input fields
    fields: ["student_id", "goal_name", "target_amount", "saved_amount", "target_date"],
  },
};

// Main app component
function App() {
  // Email input state
  const [email, setEmail] = useState("");

  // Password input state
  const [password, setPassword] = useState("");

  // Login token state
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");

  // Selected API state
  const [selectedApi, setSelectedApi] = useState("Students");

  // API data state
  const [data, setData] = useState<any[]>([]);

  // Form data state
  const [formData, setFormData] = useState<any>({});

  // Update id state
  const [updateId, setUpdateId] = useState("");

  // Delete id state
  const [deleteId, setDeleteId] = useState("");

  // Message text state
  const [message, setMessage] = useState("");

  // Login function
  async function login() {
    // Send login request
    const response = await fetch(`${API_URL}/auth/login`, {
      // Use POST method
      method: "POST",

      // Send JSON header
      headers: {
        // Body is JSON
        "Content-Type": "application/json",
      },

      // Convert login data
      body: JSON.stringify({
        // Send email value
        email,

        // Send password value
        password,
      }),
    });

    // Read JSON response
    const result = await response.json();

    // Check token exists
    if (result.token) {
      // Save session token
      sessionStorage.setItem("token", result.token);

      // Update token state
      setToken(result.token);

      // Show success message
      setMessage("Login successful");
    } else {
      // Show error message
      setMessage(result.error || "Login failed");
    }
  }

  // Get API data
  async function getData(apiName: string) {
    // Get API object
    const api = apiOptions[apiName];

    // Send GET request
    const response = await fetch(`${API_URL}${api.path}`, {
      // Use GET method
      method: "GET",

      // Send auth header
      headers: {
        // Send bearer token
        Authorization: `Bearer ${token}`,
      },
    });

    // Read JSON response
    const result = await response.json();

    // Set selected API
    setSelectedApi(apiName);

    // Store array data
    setData(Array.isArray(result) ? result : []);

    // Show result message
    setMessage(result.error || `${apiName} data loaded`);
  }

  // Change form value
  function handleChange(field: string, value: string) {
    // Update form object
    setFormData({
      // Keep old values
      ...formData,

      // Update one field
      [field]: value,
    });
  }

  // Create new data
  async function createData() {
    // Get selected API
    const api = apiOptions[selectedApi];

    // Send POST request
    const response = await fetch(`${API_URL}${api.path}`, {
      // Use POST method
      method: "POST",

      // Send request headers
      headers: {
        // Body is JSON
        "Content-Type": "application/json",

        // Send login token
        Authorization: `Bearer ${token}`,
      },

      // Send form data
      body: JSON.stringify(formData),
    });

    // Read JSON response
    const result = await response.json();

    // Show API message
    setMessage(result.error || "Data added successfully");

    // Reload table data
    getData(selectedApi);
  }

  // Update existing data
  async function updateData() {
    // Get selected API
    const api = apiOptions[selectedApi];

    // Send PUT request
    const response = await fetch(`${API_URL}${api.path}/${updateId}`, {
      // Use PUT method
      method: "PUT",

      // Send request headers
      headers: {
        // Body is JSON
        "Content-Type": "application/json",

        // Send login token
        Authorization: `Bearer ${token}`,
      },

      // Send form data
      body: JSON.stringify(formData),
    });

    // Read JSON response
    const result = await response.json();

    // Show API message
    setMessage(result.error || "Data updated successfully");

    // Reload table data
    getData(selectedApi);
  }

  // Delete existing data
  async function deleteData() {
    // Get selected API
    const api = apiOptions[selectedApi];

    // Send DELETE request
    const response = await fetch(`${API_URL}${api.path}/${deleteId}`, {
      // Use DELETE method
      method: "DELETE",

      // Send auth header
      headers: {
        // Send bearer token
        Authorization: `Bearer ${token}`,
      },
    });

    // Read JSON response
    const result = await response.json();

    // Show API message
    setMessage(result.error || "Data deleted successfully");

    // Reload table data
    getData(selectedApi);
  }

  // Logout function
  function logout() {
    // Remove saved token
    sessionStorage.removeItem("token");

    // Clear token state
    setToken("");

    // Clear API data
    setData([]);

    // Clear message text
    setMessage("");
  }

  // Show login page
  if (!token) {
    // Return login screen
    return (
      // Login page wrapper
      <main className="login-page">
        {/* Dollar logo */}
        <div className="logo">$</div>

        {/* App main title */}
        <h1>Student Budget Tracker</h1>

        {/* App short text */}
        <p>Track income, expenses, budgets, and savings goals.</p>

        {/* Login heading */}
        <h2>Login</h2>

        {/* Email input box */}
        <input
          // Email input type
          type="email"
          // Email placeholder text
          placeholder="Enter email"
          // Save email value
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input box */}
        <input
          // Password input type
          type="password"
          // Password placeholder text
          placeholder="Enter password"
          // Save password value
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login button */}
        <button onClick={login}>Login</button>

        {/* Message output */}
        <p>{message}</p>
      </main>
    );
  }

  // Return dashboard screen
  return (
    // Dashboard page wrapper
    <main className="dashboard-page">
      {/* Top small text */}
      <h3>Save $$$</h3>

      {/* App dashboard name */}
      <h2>Budget Tracker</h2>

      {/* API button menu */}
      <nav>
        {/* Create API buttons */}
        {Object.keys(apiOptions).map((apiName) => (
          // One API button
          <button key={apiName} onClick={() => getData(apiName)}>
            {/* Button name */}
            {apiName}
          </button>
        ))}

        {/* Logout button */}
        <button onClick={logout}>Logout</button>
      </nav>

      {/* Dashboard title */}
      <h1>Student Budget Dashboard</h1>

      {/* Login success text */}
      <p>Logged in successfully. You can see your Budget Tracker.</p>

      {/* CRUD form section */}
      <section className="crud-box">
        {/* Selected API title */}
        <h2>{selectedApi}</h2>

        {/* Show id field */}
        <p>ID field: {apiOptions[selectedApi].idField}</p>

        {/* Create form inputs */}
        {apiOptions[selectedApi].fields.map((field: string) => (
          // One input field
          <input
            // Unique input key
            key={field}
            // Field placeholder
            placeholder={field}
            // Save field value
            onChange={(e) => handleChange(field, e.target.value)}
          />
        ))}

        {/* Add data button */}
        <button onClick={createData}>Add</button>

        {/* Update id input */}
        <input
          // Update id placeholder
          placeholder="ID to update"
          // Save update id
          onChange={(e) => setUpdateId(e.target.value)}
        />

        {/* Update data button */}
        <button onClick={updateData}>Update</button>

        {/* Delete id input */}
        <input
          // Delete id placeholder
          placeholder="ID to delete"
          // Save delete id
          onChange={(e) => setDeleteId(e.target.value)}
        />

        {/* Delete data button */}
        <button onClick={deleteData}>Delete</button>
      </section>

      {/* API result message */}
      <p>{message}</p>

      {/* Data display section */}
      <section className="data-box">
        {/* Data section title */}
        <h2>{selectedApi} Data</h2>

        {/* Show empty or data */}
        {data.length === 0 ? (
          // Empty data text
          <p>Tap any button above to see your data.</p>
        ) : (
          // Show JSON data
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </section>
    </main>
  );
}

// Export app component
export default App;