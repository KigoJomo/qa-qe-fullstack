import express from 'express';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import cors from 'cors';

// configure the dotenv
dotenv.config();

// instance of express
const app = express();

// load the variables
const port = process.env.PORT;
console.log('Port: ', port);

// enable cors for all origins
// app.use(cors())

// enable cors with options --- RECOMMENDED
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

// get the current directory
const _dirname = path.resolve();

// asynchronously read the file
const eventData = readFileSync(
  path.join(_dirname, 'src', 'db', 'events.json'),
  'utf-8'
);

console.log(typeof JSON.parse(eventData));

// a simple get request saying hello world
app.get('/', (req, res) => {
  res.send('Hello World!\nThis is some crazy stuff man :-)');
});

app.get('/events', (req, res) => {
  res.send(JSON.parse(eventData));
});

// create a server
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
