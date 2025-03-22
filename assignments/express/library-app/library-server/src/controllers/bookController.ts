import pool from "@app/config/db";
import { AuthRequest } from "@app/middleware/auth";
import { Request, Response } from "express";

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

export const addBook = async(req: AuthRequest, res: Response) => {
  const { title, author, genre, year, pages, publisher, description, image, price, total_copies } = req.body;

  const requiredFields = ['title', 'author', 'genre', 'year', 'pages', 'publisher', 'description', 'image', 'price', 'total_copies'];
  const missingFields = requiredFields.filter(field => !req.body[field]);
  
  if(missingFields.length > 0){
    res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    return
  }

  try {
    const creatorId = req.user.user_id;
    const available_copies = total_copies;

    const result = await pool.query(
      `INSERT INTO books (title, author, genre, year, pages, publisher, description, image, price, total_copies, available_copies, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [title, author, genre, year, pages, publisher, description, image, price, total_copies, available_copies, creatorId]
    );

    res.status(201).json({ message: "Book added successfully", book: result.rows[0] })
  } catch (error) {
    console.error('Erro adding book: ', error)
    res.status(500).send('Uuummh ... server is acting up bruh')
  }
}

export const updateBook = async (req: Request, res: Response) => {
  const { book_id } = req.params;
  const { title, author, genre, year, pages, publisher, description, image, price, total_copies } = req.body

  if(!title || !author || !genre || !year || !pages || !publisher || !description || !image || !price || !total_copies){
    res.status(400).json({ error: "Hey ... enter all fields dude!" });
    return
  }

  try {
    const result = await pool.query(
      `UPDATE books
      SET title = $1, author = $2, genre = $3, year = $4, pages = $5, publisher = $6, description = $7, image = $8, price = $9, total_copies = $10, updated_at = CURRENT_TIMESTAMP
      WHERE book_id = $11
      RETURNING *`,
      [title, author, genre, year, pages, publisher, description, image, price, total_copies, book_id]
    );

    if(result.rows.length === 0){
      res.status(404).send("Book not found.")
      return;
    }

    res.json({ message: "Book updated successfully.", book: result.rows[0] })
  } catch (error) {
    console.error('Something went wrong: ', error)
    res.status(500).send("Internal server error.")
  }
}

export const deleteBook = async(req: Request, res:Response) => {
  const {book_id} = req.params

  try {
    const result = await pool.query("DELETE FROM books WHERE book_id = $1 RETURNING *", [book_id]);

    if(result.rows.length === 0){
      res.status(404).send("This book doesn't exist dude.")
    }

    res.json({ message: "The book is now vanished from the db." })
  } catch (error) {
    console.error('Something went wrong: ', error)
    res.status(500).send("Server's acting up man :-(")
  }
}