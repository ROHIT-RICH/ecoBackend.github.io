// routes/authRoutes.js
import express from 'express';  // Add this import statement
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

export default router;
