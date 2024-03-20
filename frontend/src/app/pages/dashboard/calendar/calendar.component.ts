import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { LocalStorageService } from '../../../shared/services/localStorage/localStorage.service';
import { HistoryService } from '../../../shared/services/history/history.service';
import { HistoryData, HistoryElement } from '../history/history.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  initialView!: string;
  userInfo!: string;
  userAddress!: string;
  historyData!: HistoryData;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  constructor(
    public dashboardService: DashboardService,
    public localStorageService: LocalStorageService,
    public historyService: HistoryService
  ) {
    this.userInfo = this.localStorageService.getItem('userInfo') as string;
    const userInfoParse = JSON.parse(this.userInfo);
    this.userAddress = userInfoParse.address;
  }

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory = async () => {
    const res = await this.historyService.getHistory(this.userAddress);
    this.historyData = res;
    // add events to calendar
    this.calendarOptions.events = this.historyData.data.map(
      (item: HistoryElement) => {
        const { title, startDate, endDate } = item;
        return {
          title,
          start: startDate,
          end: endDate,
        };
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.dashboardService.onResize(event);
    this.updateCalendarView();
  }

  // change view when window resize
  updateCalendarView = () => {
    if (this.dashboardService.isLaptopSmallScreen) {
      this.calendarComponent.getApi().changeView('dayGridDay');
    } else {
      this.calendarComponent.getApi().changeView('dayGridWeek');
    }
  }

  calendarOptions: CalendarOptions = {
    nextDayThreshold: '00:00:00',
    initialView: 'dayGridWeek',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
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
