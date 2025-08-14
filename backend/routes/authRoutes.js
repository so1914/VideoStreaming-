import { Router } from 'express';
import { login, logout, me, register } from '../controllers/authController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protectRoute, me);

export default router;