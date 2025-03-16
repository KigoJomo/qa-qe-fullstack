import { Router } from 'express';
import path from 'path';
import { login, signup } from '../controllers/authController';

const router = Router();

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../frontend/signup.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../frontend/login.html'));
});

router.post('/signup', signup);
router.post('/login', login);

export default router;
