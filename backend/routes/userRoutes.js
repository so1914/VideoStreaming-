import { Router } from 'express';
import { getUsers } from '../controllers/userController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protectRoute, getUsers);

export default router;