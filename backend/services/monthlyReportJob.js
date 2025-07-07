import Expense from '../models/expenseSchema.js';
import Budget from '../models/budgetSchema.js';
import { insertMonthlyReport } from './reportService.js';
import mongoose from 'mongoose';

// Helper to get YYYY-MM for last month
function getLastMonth() {
  const now = new Date();
  now.setMonth(now.getMonth() - 1);
  return now.toISOString().slice(0, 7);
}

export async function generateMonthlyReportsForAllUsers() {
  // Get all unique user IDs from expenses
  const userIds = await Expense.distinct('user');
  const month = getLastMonth();
  for (const userId of userIds) {
    // Get all expenses for user for last month
    const start = new Date(month + '-01');
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    const expenses = await Expense.find({ user: userId, date: { $gte: start, $lt: end } });
    if (!expenses.length) continue;
    const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    // Top category
    const catTotals = {};
    expenses.forEach(e => { catTotals[e.category] = (catTotals[e.category] || 0) + Number(e.amount); });
    const topCategory = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
    // Overbudget categories
    const budgets = await Budget.find({ user: userId, month });
    const overbudgetCategories = budgets.filter(b => {
      const spent = catTotals[b.category] || 0;
      return spent > b.amount;
    }).map(b => b.category);
    // Save report
    await insertMonthlyReport({
      userId: userId.toString(),
      month,
      totalSpent,
      topCategory,
      overbudgetCategories
    });
  }
}
