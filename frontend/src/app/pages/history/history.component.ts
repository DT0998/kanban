import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements AfterViewInit {
  constructor() {}
  displayedColumns: string[] = ['id', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<HistoryElement>(HISTORY_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // config paginator
    this.dataSource.paginator = this.paginator;
  }
}

export interface HistoryElement {
  id: number;
  startDate: Date;
  endDate: Date;
}

const HISTORY_DATA: HistoryElement[] = [
  { id: 1, startDate: new Date(), endDate: new Date() },
  { id: 2, startDate: new Date(), endDate: new Date() },
  { id: 3, startDate: new Date(), endDate: new Date() },
  { id: 4, startDate: new Date(), endDate: new Date() },
  { id: 5, startDate: new Date(), endDate: new Date() },
  { id: 6, startDate: new Date(), endDate: new Date() },
  { id: 7, startDate: new Date(), endDate: new Date() },
  { id: 8, startDate: new Date(), endDate: new Date() },
  { id: 9, startDate: new Date(), endDate: new Date() },
  { id: 10, startDate: new Date(), endDate: new Date() },
  { id: 11, startDate: new Date(), endDate: new Date() },
  { id: 12, startDate: new Date(), endDate: new Date() },
  { id: 13, startDate: new Date(), endDate: new Date() },
  { id: 14, startDate: new Date(), endDate: new Date() },
  { id: 15, startDate: new Date(), endDate: new Date() },
];
