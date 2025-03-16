import express from 'express';
import booksRouter from './routes/books';
import authRouter from "./routes/auth";
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(express.static(path.join(__dirname, '../../frontend')));



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});



// mount routes
app.use('/books', booksRouter);
app.use("/auth", authRouter);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
