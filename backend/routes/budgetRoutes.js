import express from 'express';
import { deleteBudget, getBudgets, setBudget, updateBudget } from '../controllers/budgetControllers';

const router = express.Router();

// Set a new budget or update if same category+month already exists
router.post('/', setBudget);

// Get budgets for current user (optional ?month=YYYY-MM)
router.get('/', getBudgets);

// Update budget by ID
router.put('/:id', updateBudget);

// Delete budget by ID
router.delete('/:id', deleteBudget);

export default router;
