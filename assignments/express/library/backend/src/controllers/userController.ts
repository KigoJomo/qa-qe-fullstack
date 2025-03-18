import { Request, Response } from "express";
import pool from "@app/config/db";

// List all users (with role details)
export const listUsers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT u.user_id, u.first_name, u.last_name, u.email, u.role_id, ur.role_name
      FROM users u
      JOIN user_roles ur ON u.role_id = ur.role_id
      ORDER BY u.user_id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get a single user's details
export const getUser = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT u.user_id, u.first_name, u.last_name, u.email, u.role_id, ur.role_name
      FROM users u
      JOIN user_roles ur ON u.role_id = ur.role_id
      WHERE u.user_id = $1
      `,
      [user_id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found." });
      return
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Update a user (e.g., update first name, last name, email, and role)
export const updateUser = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { first_name, last_name, email, role_id } = req.body;

  if (!first_name || !last_name || !email || !role_id) {
    res.status(400).json({ error: "All fields are required." });
    return
  }

  try {
    const result = await pool.query(
      `
      UPDATE users
      SET first_name = $1, last_name = $2, email = $3, role_id = $4
      WHERE user_id = $5
      RETURNING *
      `,
      [first_name, last_name, email, role_id, user_id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found." });
      return;
    }
    res.json({ message: "User updated successfully", user: result.rows[0] });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM users WHERE user_id = $1 RETURNING *`,
      [user_id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found." });
      return;
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
