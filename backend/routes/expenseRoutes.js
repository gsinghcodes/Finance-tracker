import express from 'express';

import { addExpense, deleteExpense, getExpenses, updateExpense } from '../controllers/expenseControllers.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate)

router.post('/', authenticate, addExpense);         // Add new expense
router.get('/', authenticate, getExpenses);         // Get all expenses for user
router.put('/:id', authenticate, updateExpense);    // Update expense by ID
router.delete('/:id', authenticate, deleteExpense); // Delete expense by ID

export default router;
