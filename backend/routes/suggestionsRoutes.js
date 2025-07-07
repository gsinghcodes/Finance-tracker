import express from 'express';
import { getSmartSuggestions } from '../controllers/suggestionController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/smart', authenticate,getSmartSuggestions);

export default router;
