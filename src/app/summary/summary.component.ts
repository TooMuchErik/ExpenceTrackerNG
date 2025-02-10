import { Component, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [NgxEchartsModule, CommonModule],  //  Adaugă NgxEchartsModule
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  pieChartOptions: any;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.updateChart();
  }

  updateChart() {
    const categoryTotals = this.expenseService.getCategoryTotals();
    console.log("Category Totals:", categoryTotals);

    if (!categoryTotals || Object.keys(categoryTotals).length === 0) {
      console.warn("Nu sunt date pentru grafic!");
      return;
    }

    this.pieChartOptions = {
      title: {
        text: 'Expense Summary',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Expenses',
          type: 'pie',
          radius: '50%',
          data: Object.keys(categoryTotals).map(category => ({
            name: category,
            value: categoryTotals[category]
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    console.log("Pie Chart Options:", this.pieChartOptions);
  }
}
