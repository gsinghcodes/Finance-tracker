import express from 'express';

import { addExpense, deleteExpense, getExpenses, updateExpense } from '../controllers/expenseControllers.js';

const router = express.Router();

router.post('/', addExpense);         // Add new expense
router.get('/', getExpenses);         // Get all expenses for user
router.put('/:id', updateExpense);    // Update expense by ID
router.delete('/:id', deleteExpense); // Delete expense by ID

export default router;
