import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  pieChartData!: ChartConfiguration<'pie'>['data'];
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
  };

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.updateChart();
  }

  updateChart() {
    const categoryTotals = this.expenseService.getCategoryTotals();
    this.pieChartData = {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        },
      ],
    };
  }
}
