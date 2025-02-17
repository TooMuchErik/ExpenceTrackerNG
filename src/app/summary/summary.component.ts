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
  dailyCharts: any[] = [];
  totalChart: any;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.generateDailyCharts();
    this.generateTotalChart();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }

  generateDailyCharts() {
    const days = Object.keys(
      this.expenseService.getWeeklySummary().reduce<Record<string, any[]>>((acc, { day }) => {
        acc[day] = [];
        return acc;
      }, {})
    );

    days.forEach((day) => {
      const expenses = this.expenseService.getExpenses(day);
      if (expenses.length) {
        const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        const dayChart = {
          day,
          total,
          options: {
            title: {
              text: `${day} Expenses`,
              left: 'center',
              textStyle: { fontSize: 14 }
            },
            tooltip: { trigger: 'item' },
            series: [
              {
                name: day,
                type: 'pie',
                radius: '40%',
                data: expenses.map((exp) => ({
                  name: exp.category,
                  value: exp.amount
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
          }
        };
        this.dailyCharts.push(dayChart);
      }
    });
  }

  generateTotalChart() {
    const categoryTotals = this.expenseService.getCategoryTotals();
    const totalWeekly = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);

    this.totalChart = {
      total: totalWeekly,
      options: {
        title: {
          text: 'Total Weekly Expenses',
          left: 'center',
          textStyle: { fontSize: 23, fontWeight: 'bold' }
        },
        tooltip: { trigger: 'item' },
        series: [
          {
            name: 'Expenses',
            type: 'pie',
            radius: '60%',
            data: Object.entries(categoryTotals).map(([category, amount]) => ({
              name: category,
              value: amount
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 15,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.6)'
              }
            }
          }
        ]
      }
    };
  }
}
