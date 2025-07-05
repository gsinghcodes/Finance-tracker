# Finance Tracker

A full-stack web application for tracking daily expenses, setting monthly budgets, and viewing simple reports to help users understand and manage their spending. The project will also include a Python service for smart budget suggestions.

---

## Features (Planned & In Progress)

### 1. User Accounts
- Users can sign up and log in using email and password.
- Each user sees only their own data after login.

### 2. Add & Manage Expenses
- Users can add, edit, and delete expenses.
- Each expense includes:
  - Amount (e.g., ₹1200)
  - Category (e.g., Food, Rent, Shopping, etc.)
  - Date
  - Payment Method (e.g., UPI, Credit Card, Cash)
- Users can filter expenses by date, category, or payment method.
- Users can search expenses.

### 3. Budget & Alerts
- Users can set a monthly spending limit for each category.
- Shows a warning/alert if a category crosses 80% or 100% of its budget.

### 4. Dashboard (Reports Page)
- Total money spent in the current month.
- Category with the highest spending.
- Top 3 payment methods used.
- Pie chart for category-wise spending.
- Line graph for spending over time.
- (Charts will use Chart.js or Recharts.)

### 5. Smart Suggestions (Python Service)
- Python script or Flask API analyzes last 30 days of spending.
- Provides suggestions, e.g.:
  - “You’re spending a lot on Food. Try to reduce it by 15%.”
  - “Your travel expenses increased a lot this month.”
- (Optional) Suggestions returned as JSON for frontend display.

### 6. Monthly Reports (SQL)
- Each month, save a summary report in a SQL database (SQLite/PostgreSQL).
- Store: User ID, Month, Total Spent, Top Category, Overbudget Categories.
- (Optional) Show past 3 months’ reports using SQL queries.

---

## Tech Stack

| Part         | Tool/Framework                        |
|--------------|--------------------------------------|
| Frontend     | Next.js (React) + TailwindCSS        |
| Backend      | Node.js + Express.js                 |
| Main DB      | MongoDB (users, expenses, budgets)   |
| SQL DB       | SQLite or PostgreSQL (reports)       |
| Charts       | Chart.js or Recharts                 |
| Python       | Flask or CLI script + Pandas         |

---

## Deployment

- **Frontend:** Vercel, Netlify, or similar
- **Backend + Python:** Render, Railway, Cyclic, or local (with instructions)

---

## Current Implementation

- **Backend MongoDB Schemas:**  
  - [`models/userSchema.js`](backend/models/userSchema.js): User schema  
  - [`models/expenseSchema.js`](backend/models/expenseSchema.js): Expense schema  
  - [`models/budgetSchema.js`](backend/models/budgetSchema.js): Budget schema  
- **Basic Express server:** [`backend/app.js`](backend/app.js)
- **Frontend:** Next.js app scaffolded, with TailwindCSS setup

---

_This README will be updated as the project progresses._