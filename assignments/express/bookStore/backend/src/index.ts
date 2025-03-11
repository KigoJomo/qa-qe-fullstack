import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import pool from './db';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../frontend')));
app.use(express.json());

app.get('/api/books', async (req, res) => {
  try {
    const { genre, sort, direction } = req.query;
    let baseQuery = 'SELECT * FROM books';
    const values: any[] = [];
    const conditions: string[] = [];

    if (genre && typeof genre === 'string' && genre.trim() !== '') {
      conditions.push(`LOWER(genre) = LOWER($${values.length + 1})`);
      values.push(genre.trim());
    }
    if (conditions.length > 0) {
      baseQuery += ' WHERE ' + conditions.join(' AND ');
    }

    const validSorts = ['title', 'year', 'pages', 'price'];
    let orderClause = '';
    if (
      sort &&
      typeof sort === 'string' &&
      validSorts.includes(sort.toLowerCase())
    ) {
      const dir =
        direction && direction.toString().toLowerCase() === 'desc'
          ? 'DESC'
          : 'ASC';
      orderClause = ` ORDER BY ${sort} ${dir}`;
    }
    const finalQuery = baseQuery + orderClause;

    const result = await pool.query(finalQuery, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/books', async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      year,
      pages,
      publisher,
      description,
      image,
      price,
    } = req.body;
    const result = await pool.query(
      `INSERT INTO books (title, author, genre, year, pages, publisher, description, image, price)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [title, author, genre, year, pages, publisher, description, image, price]
    );

    console.log(
      `Book created successfully: "${result.rows[0].title}" (ID: ${result.rows[0].id})`
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.patch('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fields = Object.keys(req.body);
    if (fields.length === 0) {
      res.status(400).json({ error: 'No fields provided for update' });
      return;
    }

    const setClause = fields
      .map((field, index) => `"${field}" = $${index + 1}`)
      .join(', ');
    const values = fields.map((field) => req.body[field]);
    values.push(id);

    const query = `UPDATE books SET ${setClause} WHERE id = $${
      fields.length + 1
    } RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error patching book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put(
  '/api/books/:id',
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const {
        title,
        author,
        genre,
        year,
        pages,
        publisher,
        description,
        image,
        price,
      } = req.body;

      const result = await pool.query(
        `UPDATE books SET title=$1, author=$2, genre=$3, year=$4, pages=$5, publisher=$6, description=$7, image=$8, price=$9
       WHERE id=$10 RETURNING *`,
        [
          title,
          author,
          genre,
          year,
          pages,
          publisher,
          description,
          image,
          price,
          id,
        ]
      );

      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

app.delete('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM books WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    res.json({ message: 'Book deleted successfully', book: result.rows[0] });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
