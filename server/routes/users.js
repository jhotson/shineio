import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate.js';
import { UsersService } from '../services/users.js';

const router = express.Router();
const usersService = new UsersService();

// Get user profile
router.get('/profile', async (req, res) => {
  const userId = req.auth.sub;
  const user = await usersService.getUser(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Update user profile
router.put('/profile',
  [
    body('name').trim().optional(),
    body('bio').trim().optional(),
    body('email').isEmail().optional(),
  ],
  validateRequest,
  async (req, res) => {
    const userId = req.auth.sub;
    const user = await usersService.updateUser(userId, req.body);
    res.json(user);
  }
);

// Update notification preferences
router.put('/notifications',
  body('preferences').isObject(),
  validateRequest,
  async (req, res) => {
    const userId = req.auth.sub;
    const preferences = await usersService.updateNotificationPreferences(userId, req.body.preferences);
    res.json(preferences);
  }
);

export { router as usersRouter };