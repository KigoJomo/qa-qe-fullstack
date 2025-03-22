import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BriefcaseBusiness, House, ListTodo, LucideAngularModule, ShoppingCart, User } from 'lucide-angular'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LucideAngularModule.pick({ ListTodo, House, BriefcaseBusiness, ShoppingCart, User })
  ]
})
export class TodoModule { }
