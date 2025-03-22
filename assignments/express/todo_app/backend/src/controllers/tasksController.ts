import { Todo } from '@app/entity/Todo';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const todoRepository = getRepository(Todo);
    const todos = await todoRepository.find({
      order: {
      id: 'DESC'
      }
    });
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, category } = req.body;
    const todoRepository = getRepository(Todo);
    const newTodo = todoRepository.create({
      title,
      category,
      completed: false,
    });
    const result = await todoRepository.save(newTodo);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const toggleTask = async (req: Request, res: Response) => {
  try {
    const todoRepository = getRepository(Todo);
    const todo = await todoRepository.findOne({
      where: { id: parseInt(req.params.id) },
    });
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    todo.completed = !todo.completed;
    const result = await todoRepository.save(todo);
    res.json(result);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const todoRepository = getRepository(Todo);
    const result = await todoRepository.delete(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
