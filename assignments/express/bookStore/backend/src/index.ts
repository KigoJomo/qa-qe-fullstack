import express from 'express';
import dotenv from 'dotenv';
import { books } from './books';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('/api/books', (req, res) => {
  const genre = req.query.genre;
  
  if (typeof genre === 'string' && genre.trim() !== '') {
    const lowerGenre = genre.trim().toLowerCase();
    const filteredBooks = books.filter(book => book.genre.toLowerCase() === lowerGenre);
    res.json(filteredBooks);
  } else {
    res.json(books);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
