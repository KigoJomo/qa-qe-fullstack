import { Request, Response } from 'express';
import pool from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '@app/middleware/auth';

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
const JWT_SECRET = process.env.JWT_SECRET!;

export const signup = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    res.status(400).json({ error: "You've got to enter all fields bruh!" });
    return;
  }

  try {
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    if (existingUser.rows.length > 0) {
      res
        .status(400)
        .json({ error: 'This email is already registered dude!!' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const roleId = 3;
    const newUserResult = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [first_name, last_name, email, hashedPassword, roleId]
    );
    const newUser = newUserResult.rows[0];

    const token = jwt.sign(
      {
        user_id: newUser.user_id,
        email: newUser.email,
        role: newUser.role_id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("There's been a slight hitch bruh ...", error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('Login attempt with missing fields:', { email, password });
    res.status(400).json({
      error: "You've got to provide both your email and password dude!!",
    });
    return;
  }

  try {
    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      res.status(400).json({ error: 'Invalid credentials dude ...' });
      return;
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ error: 'Invalid credentials dude ...' });
      return;
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role_id,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(
      "There's been a slight hitch bruh, couldn't log you in ...",
      error
    );
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getCurrentUser = (req: AuthRequest, res: Response) => {
  if (req.user) {
    console.log(`User: ${req.user}`)
    res.json({ user: req.user });
  } else {
    console.log(`Not authenticated.`)
    res.status(401).send("Ain't no authenticated user 'round here!");
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  res.json({ message: "Logged out successfully." })
};
