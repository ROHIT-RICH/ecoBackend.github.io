// routes/cartRoutes.js
import express from 'express';
import { addToCart, updateCart, removeFromCart } from '../controllers/cartController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, addToCart);
router.put('/:id', authenticate, updateCart);
router.delete('/:id', authenticate, removeFromCart);

export default router;
