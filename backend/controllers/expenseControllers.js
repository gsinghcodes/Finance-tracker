import Expense from '../models/expenseSchema.js';

// Create a new expense
export const addExpense = async (req, res) => {
  try {
    const { amount, category, paymentMethod, date } = req.body;

    const expense = await Expense.create({
      amount,
      category,
      paymentMethod,
      date,
      user: req.user.userId
    });

    res.status(201).json({ message: 'Expense added successfully', expense });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

// Update an expense by ID (only if it belongs to the user)
export const updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Expense not found or not authorized' });
    }

    res.status(200).json({ message: 'Expense updated', updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
};

// Delete an expense by ID (only if it belongs to the user)
export const deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Expense not found or not authorized' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};
