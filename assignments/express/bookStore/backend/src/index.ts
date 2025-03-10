import express from 'express';
import dotenv from 'dotenv';
import { books, Book } from './books';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('/api/books', (req, res) => {
  const genre = req.query.genre;
  const sort = req.query.sort;
  const direction = req.query.direction;

  let filteredBooks = [...books];

  if (typeof genre === 'string' && genre.trim() !== '') {
    const lowerGenre = genre.trim().toLowerCase();
    filteredBooks = books.filter(book => book.genre.toLowerCase() === lowerGenre);
  }

  if (typeof sort === 'string') {
    const sortKey = sort.toLowerCase();
    const validSorts = ['title', 'year', 'pages', 'price'];
    
    if (validSorts.includes(sortKey)) {
      filteredBooks.sort((a, b) => {
        if (sortKey === 'title') return a.title.localeCompare(b.title);
        return (a[sortKey as keyof Book] as number) - (b[sortKey as keyof Book] as number);
      });

      if (direction === 'desc') filteredBooks.reverse();
    }
  }

  res.json(filteredBooks);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
