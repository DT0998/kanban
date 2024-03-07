import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements AfterViewInit {
  HISTORY_DATA: HistoryElement[] = [
    { id: 1, startDate: new Date(), endDate: this.getLastDayOfMonth() },
  ];
  constructor() {}
  displayedColumns: string[] = ['id', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<HistoryElement>(this.HISTORY_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // config paginator
    this.dataSource.paginator = this.paginator;
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
}

export interface HistoryElement {
  id: number;
  startDate: Date;
  endDate: Date;
}
