import {Router} from 'express'
import { getMe, loginUser, logoutUser, signupUser } from '../controllers/userControllers.js';
import { authenticate } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/me', authenticate, getMe);

export default router