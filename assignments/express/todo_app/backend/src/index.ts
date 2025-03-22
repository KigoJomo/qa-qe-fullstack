import "reflect-metadata"
import { setupAliases } from "import-aliases"
setupAliases()
import express from "express"
import cors from "cors"
import tasksRouter from "@app/routes/tasks";
import { createConnection } from "typeorm";

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// Basic health check endpoint
app.get('/', (req, res) => {
  res.send('Express server with TypeORM is running.');
});

app.use('/todos', tasksRouter)

// Connect to the database and then start the server
createConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.error("TypeORM connection error: ", error));