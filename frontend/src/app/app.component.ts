import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DashboardService } from './shared/services/dashboard/dashboard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'kanban-dapp';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // update screen size
    this.dashboardService.updateScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    // update screen size
    this.dashboardService.updateScreenSize();
  }
}
