import Budget from '../models/budgetSchema.js';

// Set or update a budget for month
export const setBudget = async (req, res) => {
  try {
    const { amount, month } = req.body;
    const userId = req.user.userId;

    // If a budget already exists for this month + user, update it
    const existing = await Budget.findOne({ user: userId, month });

    if (existing) {
      existing.amount = amount;
      await existing.save();
      return res.status(200).json({ message: 'Budget updated', budget: existing });
    }

    const newBudget = await Budget.create({ user: userId, amount, month });
    res.status(201).json({ message: 'Budget set', budget: newBudget });

  } catch (err) {
    res.status(500).json({ error: 'Failed to set budget' });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const userId = req.user.userId;
    const month = req.query.month;


    const budgets = await Budget.find({user: userId, month: month  || new Date().toISOString().slice(0, 7)});
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch budgets' });
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
