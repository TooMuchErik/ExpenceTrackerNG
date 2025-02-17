enum ExpenseCategory {
  Food = 'Food',
  Transport = 'Transport',
  Entertainment = 'Entertainment',
  Utilities = 'Utilities',
  Other = 'Other'
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../services/expense.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-daily-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './daily-expenses.component.html',
  styleUrls: ['./daily-expenses.component.css'],
})
export class DailyExpensesComponent {
  @Input() currentDay = 'Sunday';
  categories = Object.values(ExpenseCategory);
  category: ExpenseCategory | '' = '';
  amount = 0;

  editingIndex: number | null = null;
  editedCategory: string = '';
  editedAmount: number = 0;

  constructor(private expenseService: ExpenseService) { }

  get expenses() {
    return this.expenseService.getExpenses(this.currentDay);
  }

  getTotalAmount(): number {
    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  addExpense() {
    if (this.category && this.amount > 0) {
      this.expenseService.addExpense(this.currentDay, this.category, this.amount);
      this.category = '';
      this.amount = 0;
    }
  }

  deleteExpense(index: number) {
    this.expenseService.deleteExpense(this.currentDay, index);
  }

  startEditing(index: number) {
    const expense = this.expenses[index];
    this.editingIndex = index;
    this.editedCategory = expense.category;
    this.editedAmount = expense.amount;
  }

  saveExpense(index: number) {
    if (this.editedCategory && this.editedAmount > 0) {
      this.expenseService.updateExpense(this.currentDay, index, {
        category: this.editedCategory,
        amount: this.editedAmount,
      });
      this.editingIndex = null;
    }
  }

  cancelEditing() {
    this.editingIndex = null;
  }
}
