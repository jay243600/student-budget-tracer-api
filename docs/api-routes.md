# Planned Api Routes

## Our Project Name:- "Student Budget Tracker"...........!!!!!!!!!!!! 

# Backend Planner:- "Dev Choksi"...........!!!!!!!!!!!!!!! 

# These are api's which are going to be use in this project.......!!!!!!!!!!!!!!!!!!

## Here is the Api Routes...............

| Method | Route | Why Use |
| --- | --- | --- |
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Add a new expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |
| GET | `/api/income` | Get all income records |
| POST | `/api/income` | Add a new income record |
| GET | `/api/categories` | Get all spending categories |
| GET | `/api/budget-summary` | Get total income, total expenses, and remaining balance |
| GET | `/api/juicereport` | Required extra route from milestone instructions |
| GET | `/api/juicereport/:id_juice` | Required extra route using `id_juice` |


## Small Explanation of Api-routes........!!!!!!!!!!!!!!!!
These api-routes are according to REST API rules: `GET`that reads data, `POST` that creates data, `PUT` that updates data, and `DELETE` that removes data. Also,these will be used by the frontend if users want to add expenses, add their income, view all expenses, creates a summary about spending by using category and display a monthly budget summary after that.

# GET `/api/expenses`
This route gets all expense records. It helps the frontend show the expense list page.

# POST `/api/expenses`
This route adds a new expense. It helps students save spending records like rent, food, transport, and tuition.

# PUT `/api/expenses/:id`
This route updates an existing expense. It helps students fix mistakes or change expense details.

# DELETE `/api/expenses/:id`
This route deletes an expense. It helps remove wrong or unnecessary records.

# GET `/api/income`
This route gets all income records. It helps students see money received from jobs, family support, or other income.

# POST `/api/income`
This route adds a new income record. It helps students track incoming money.

# GET `/api/categories`
This route gets all spending categories. It helps organize expenses into groups like food, rent, transport, and tuition.

# GET `/api/budget-summary`
This route gives the total income, total expenses, and remaining balance. It helps students understand their monthly budget.

# GET `/api/juicereport`
This route is included because the milestone instructions require a `juicereport` route.

# GET `/api/juicereport/:id_juice`
This route is included because the milestone instructions mention `id_juice`. It shows how an API can use an ID parameter.