import { setupAliases } from 'import-aliases';
setupAliases()

import express from 'express';
import booksRouter from '@app/routes/books';
import authRouter from "@app/routes/auth";
import adminRouter from "@app/routes/admin"
import usersRouter from "@app/routes/users";
import borrowingsRouter from "@app/routes/borrowings";
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
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// app.use(express.static(path.join(__dirname, '../../frontend')));



// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../frontend/index.html'));
// });



// mount routes
app.use('/books', booksRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter)
app.use("/users", usersRouter);
app.use("/borrowings", borrowingsRouter)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
}); 