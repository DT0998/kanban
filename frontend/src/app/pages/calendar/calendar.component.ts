import { Component, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DashboardService } from '../../shared/services/dashboard/dashboard.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  initialView!: string;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  constructor(public dashboardService: DashboardService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.dashboardService.onResize(event);
    this.updateCalendarView();
  }

  // change view when window resize
  updateCalendarView() {
    if (this.dashboardService.isLaptopSmallScreen) {
      this.calendarComponent.getApi().changeView('dayGridDay');
    } else {
      this.calendarComponent.getApi().changeView('dayGridWeek');
    }
  }

  getLastDayOfMonth(): Date {
    const now = new Date();
    const lastDateOfCurrentMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    );
    return lastDateOfCurrentMonth;
  }

  calendarOptions: CalendarOptions = {
    nextDayThreshold: '00:00:00',
    initialView: 'dayGridWeek',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [
      {
        title: 'Subscribe Premium',
        start: new Date(),
        end: this.getLastDayOfMonth(),
      },
    ],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: '',
    },
  };
  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }
}
