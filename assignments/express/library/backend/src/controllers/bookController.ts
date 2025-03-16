import { Request, Response } from "express";
import pool from "../config/db";

export const getBooks = async(req: Request, res: Response) => {
  try {
    let baseQuery = 'SELECT * FROM books';
    const result = await pool.query(baseQuery);
    
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error.' })
  }
}