import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).send("You ain't got no token dude ... Unauthorized");
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Invalid token duded ... Unauthorized.')
  }
};


export const authorize = (allowedRoles: number[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if(!req.user || !allowedRoles.includes(req.user.role)){
      res.status(403).send("Watchu tryna do? You ain't authorized dude!")
      return;
    }
    next();
  }
}

export const authorizeWithRedirect = (allowedRoles: number[], redirectPath: string = '/') => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if(!req.user || !allowedRoles.includes(req.user.role)){
      res.redirect(redirectPath)
      return
    }
    next()
  }
}