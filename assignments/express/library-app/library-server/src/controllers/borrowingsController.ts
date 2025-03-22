import pool from "@app/config/db";
import { Request, Response } from "express";

export const issueBook = async (req: Request, res: Response) => {
  const { book_id, borrower_id } = req.body;

  const   librarian_id = (req as any).user.user_id;

  if(!borrower_id || !book_id){
    res.status(400).json({ error: "Book Id and Borrower Id are required!!" })
    return;
  }

  try {
    await pool.query("BEGIN")

    const bookRes = await pool.query("SELECT available_copies FROM books WHERE book_id = $1", [book_id]);

    if (bookRes.rows.length === 0) {
      await pool.query("ROLLBACK");
      res.status(404).json({ error: "Book not found." });
      return
    }
    if (bookRes.rows[0].available_copies <= 0) {
      await pool.query("ROLLBACK");
      res.status(400).json({ error: "No available copies for this book." });
      return
    }

    const insertRes = await pool.query(
      `INSERT INTO borrowers (user_id, book_id, librarian_id, borrow_date, status)
       VALUES ($1, $2, $3, CURRENT_DATE, 'Borrowed')
       RETURNING *`,
      [borrower_id, book_id, librarian_id]
    );

    await pool.query("UPDATE books SET available_copies = available_copies - 1 WHERE book_id = $1", [book_id]);

    await pool.query("COMMIT");

    res.status(201).json({ message: "Book issued successfully", borrowing: insertRes.rows[0] });

  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error issuing book:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}