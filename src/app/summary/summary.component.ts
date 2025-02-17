import { Component, OnInit } from '@angular/core';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../services/expense.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxEchartsModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: {
        echarts: () => import('echarts')
      }
    }
  ]
})

export class SummaryComponent implements OnInit {
  pieChartOptions: any;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.updateChart();
  }

  updateChart() {
    const categoryTotals = this.expenseService.getCategoryTotals();
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
  }
}
