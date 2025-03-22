import {
  getTasks,
  createTask,
  toggleTask,
  deleteTask,
} from '@app/controllers/tasksController';
import { Router } from 'express';

const tasksRouter = Router();

tasksRouter.get('/', getTasks);
tasksRouter.post('/', createTask);
tasksRouter.patch('/:id/toggle', toggleTask);
tasksRouter.delete('/:id', deleteTask);

export default tasksRouter;
