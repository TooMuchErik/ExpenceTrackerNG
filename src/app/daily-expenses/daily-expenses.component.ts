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
  categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'];
  category = '';
  amount = 0;

  constructor(private expenseService: ExpenseService) {}

  get expenses() {
    return this.expenseService.getExpenses(this.currentDay);
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
}
