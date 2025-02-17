import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {

  getExpenses(day: string) {
    return this.expenses[day];
  }

  addExpense(day: string, category: string, amount: number) {
    this.expenses[day].push({ category, amount });
  }

  deleteExpense(day: string, index: number) {
    this.expenses[day].splice(index, 1);
  }

  updateExpense(day: string, index: number, updatedExpense: { category: string; amount: number }) {
    const expenses = this.getExpenses(day);
    if (expenses && expenses[index]) {
      expenses[index] = updatedExpense;
    }
  }

  getWeeklySummary() {
    return Object.entries(this.expenses).map(([day, dayExpenses]) => {
      const total = dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      return { day, total };
    });
  }

  getCategoryTotals() {
    const totals: Record<string, number> = {};
    Object.values(this.expenses).forEach((dayExpenses) => {
      dayExpenses.forEach(({ category, amount }) => {
        totals[category] = (totals[category] || 0) + amount;
      });
    });
    return totals;
  }

  private expenses: Record<string, { category: string; amount: number }[]> = {
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  };
}
