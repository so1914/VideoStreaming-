import express from "express";
import { getStreamToken } from "../controllers/streamController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET token for authenticated user
router.get("/token", protectRoute, getStreamToken);
// router.post('/create', protectRoute, createStream);
// router.post('/delete', protectRoute, deleteStream);
export default router;
