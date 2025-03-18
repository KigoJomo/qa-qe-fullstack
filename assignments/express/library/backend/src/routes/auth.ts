import { Router } from 'express';
import path from 'path';
import { getCurrentUser, login, logout, signup } from '@app/controllers/authController';
import { authenticate } from '@app/middleware/auth';

const router = Router();

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../frontend/signup.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../frontend/login.html'));
});
router.get("/me", authenticate, getCurrentUser);
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout)

export default router;
