# Finance Tracker

A full-stack web application for tracking daily expenses, setting monthly budgets, and viewing simple reports to help users understand and manage their spending. The project also includes a Python service for smart budget suggestions and monthly SQL-based reporting.

---

## Features

### 1. User Accounts
- Sign up and log in with email and password.
- Each user sees only their own data after login.

### 2. Add & Manage Expenses
- Add, edit, and delete expenses.
- Each expense includes: Amount, Category, Date, Payment Method, Notes.
- Filter expenses by date, category, or payment method.
- Search expenses.

### 3. Budget & Alerts
- Set a monthly spending limit for each category.
- Warning/alert if a category crosses 80% or 100% of its budget.

### 4. Dashboard (Reports Page)
- Total money spent in the current month.
- Category with the highest spending.
- Top 3 payment methods used.
- Pie chart for category-wise spending.
- Line graph for spending over time.
- (Charts use Recharts.)

### 5. Smart Suggestions (Python Service)
- Python Flask API analyzes last 30 days of spending.
- Provides suggestions, e.g.:
  - “You’re spending a lot on Food. Try to reduce it by 15%.”
  - “Your travel expenses increased a lot this month.”
- Suggestions returned as JSON for frontend display.

### 6. Monthly Reports (SQL)
- Each month, a summary report is saved in a SQL database (MySQL).
- Stores: User ID, Month, Total Spent, Top Category, Overbudget Categories.
- View past 3 months’ reports in the app.

---

## Tech Stack

| Part         | Tool/Framework                        |
|--------------|--------------------------------------|
| Frontend     | Next.js (React) + TailwindCSS        |
| Backend      | Node.js + Express.js                 |
| Main DB      | MongoDB (users, expenses, budgets)   |
| SQL DB       | MySQL (reports)                      |
| Charts       | Recharts                             |
| Python       | Flask + Pandas                       |

---

## Setup & Running Locally

### Prerequisites
- Node.js, npm
- MongoDB
- MySQL
- Python 3.x

### 1. Backend
- `cd backend`
- Copy `.env.example` to `.env` and fill in your MongoDB and MySQL credentials
- Install dependencies: `npm install`
- Start server: `npm start`

### 2. Python Suggestions API
- `cd backend/python-suggestions-api`
- Install dependencies: `pip install -r requirements.txt`
- Run: `python app.py`

### 3. Frontend
- `cd frontend`
- Install dependencies: `npm install`
- Start dev server: `npm run dev`

### 4. Monthly Report Job
- To generate monthly reports, run:
  ```
  node backend/scripts/runMonthlyReportJob.js
  ```
- This reads expenses/budgets from MongoDB and saves monthly summaries in MySQL.

---

## Deployment

- **Frontend:** Vercel, Netlify, or similar
- **Backend + Python:** Render, Railway, Cyclic, or local (with instructions)

---

## Environment Variables

See `.env.example` for all required variables. Do not commit secrets.

---

## Current Implementation

### Backend
- MongoDB Schemas: users, expenses, budgets
- Controllers: user, expense, budget, suggestion
- Routes: user, expense, budget, report, suggestion
- Database Connections: MongoDB and MySQL
- Express Server: main API
- Monthly Report Job: `backend/scripts/runMonthlyReportJob.js`

### Frontend
- Next.js App: all user features, dashboard, reports
- Global styles: TailwindCSS

### Python
- Flask API for smart suggestions
- Uses Pandas for analysis

---