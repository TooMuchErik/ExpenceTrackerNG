import { Component } from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';
import { DailyExpensesComponent } from './daily-expenses/daily-expenses.component';
import { SummaryComponent } from './summary/summary.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [TabsComponent, DailyExpensesComponent, SummaryComponent, CommonModule],
})
export class AppComponent {
  currentTab = 'Sunday';

  onTabChange(tab: string) {
    this.currentTab = tab;
  }
}
