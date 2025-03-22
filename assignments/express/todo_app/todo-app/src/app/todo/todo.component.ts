import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  BriefcaseBusiness,
  House,
  ListTodo,
  LucideAngularModule,
  ShoppingCart,
  User,
  Plus,
  Check,
} from 'lucide-angular';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  imports: [NgFor, NgClass, FormsModule, LucideAngularModule],
})
export class TodoComponent implements OnInit {
  readonly Plus = Plus;
  readonly Check = Check;

  taskCategories = [
    { icon: ListTodo, title: 'General', color: '#5ac6cf' },
    { icon: House, title: 'Home', color: '#E0CA3C' },
    { icon: BriefcaseBusiness, title: 'Work', color: '#5D576B' },
    { icon: ShoppingCart, title: 'Shopping', color: '#DDA77B' },
    { icon: User, title: 'Personal', color: '#F7567C' },
  ];

  tasks: Todo[] = [];
  newTaskTitle: string = '';
  newTaskCategory: string = 'General';

  selectedCategory: string | null = null;

  get filteredTasks() {
    if (!this.selectedCategory) {
      return this.tasks;
    }
    return this.tasks.filter((task) => task.category === this.selectedCategory);
  }

  get incompleteFilteredTasks() {
    return this.filteredTasks.filter((task) => !task.completed);
  }

  get completedFilteredTasks() {
    return this.filteredTasks.filter((task) => task.completed);
  }

  selectCategory(categoryTitle: string) {
    this.selectedCategory =
      this.selectedCategory === categoryTitle ? null : categoryTitle;
    this.newTaskCategory = this.selectedCategory || 'General';
  }

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (data: Todo[]) => {
        this.tasks = data;
      },
      error: (err: any) => console.error('Error fetching todos', err),
    });
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask = {
        title: this.newTaskTitle.trim(),
        category: this.newTaskCategory,
        completed: false,
      };
      this.todoService.createTodo(newTask).subscribe({
        next: (createdTask) => {
          this.tasks.push(createdTask);
          this.newTaskTitle = '';
        },
        error: (err) => console.error('Error creating todo', err),
      });
    }
  }

  toggleTask(taskId: number) {
    this.todoService.toggleTodo(taskId).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex((task) => task.id === taskId);
        if (index > -1) {
          this.tasks[index] = updatedTask;
        }
      },
      error: (err) => console.error('Error toggling todo', err),
    });
  }

  deleteTask(taskId: number) {
    this.todoService.deleteTodo(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      },
      error: (err) => console.error('Error deleting todo', err),
    });
  }

  clearCompleted() {
    this.tasks = this.tasks.filter((t) => !t.completed);
  }

  get completedTasksCount() {
    return this.tasks.filter((t) => t.completed).length;
  }

  get allTasksCount() {
    return this.tasks.length;
  }
}
