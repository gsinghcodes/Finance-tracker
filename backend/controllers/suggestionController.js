import axios from 'axios';
import Expense from '../models/expenseSchema.js';

export const getSmartSuggestions = async (req, res) => {
  try {
    const userId = req.user.userId;

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const expenses = await Expense.find({
      user: userId,
      date: { $gte: last30Days }
    }).select('amount category date');

    const { data } = await axios.post('http://localhost:5000/suggest', {
      expenses
    });

    res.status(200).json({ suggestions: data.suggestions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
};
