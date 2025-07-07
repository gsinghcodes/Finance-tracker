import express from 'express';
import { deleteBudget, getBudgets, setBudget } from '../controllers/budgetControllers.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Set a new budget or update if same category+month already exists
router.post('/', authenticate, setBudget);

// Get budgets for current user (optional ?month=YYYY-MM)
router.get('/', authenticate, getBudgets);

// Delete budget by ID
router.delete('/:id', authenticate, deleteBudget);

export default router;
