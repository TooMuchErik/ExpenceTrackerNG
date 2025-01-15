import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent {
  @Output() tabChange = new EventEmitter<string>();
  activeTab = 'Sunday';
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Summary'];

  selectTab(tab: string) {
    this.activeTab = tab;
    this.tabChange.emit(tab);
  }
}
