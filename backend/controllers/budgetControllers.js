import Budget from '../models/budgetSchema.js';

// Set or update a budget for a category & month
export const setBudget = async (req, res) => {
  try {
    const { category, amount, month } = req.body;
    const userId = req.user.userId;

    // If a budget already exists for this category + month + user, update it
    const existing = await Budget.findOne({ user: userId, category, month });

    if (existing) {
      existing.amount = amount;
      await existing.save();
      return res.status(200).json({ message: 'Budget updated', budget: existing });
    }

    const newBudget = await Budget.create({ user: userId, category, amount, month });
    res.status(201).json({ message: 'Budget set', budget: newBudget });

  } catch (err) {
    res.status(500).json({ error: 'Failed to set budget' });
  }
};

// Get all budgets for user, optionally filter by month
export const getBudgets = async (req, res) => {
  try {
    const userId = req.user.userId;
    const month = req.query.month;

    const query = { user: userId };
    if (month) query.month = month;

    const budgets = await Budget.find(query).sort({ category: 1 });
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch budgets' });
  }
};

// Update budget by ID
export const updateBudget = async (req, res) => {
  try {
    const updated = await Budget.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Budget not found or not authorized' });
    }

    res.status(200).json({ message: 'Budget updated', budget: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update budget' });
  }
};

// Delete budget by ID
export const deleteBudget = async (req, res) => {
  try {
    const deleted = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Budget not found or not authorized' });
    }

    res.status(200).json({ message: 'Budget deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete budget' });
  }
};
