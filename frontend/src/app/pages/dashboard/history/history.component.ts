import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HistoryService } from '../../../shared/services/history/history.service';
import { LocalStorageService } from '../../../shared/services/localStorage/localStorage.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit, AfterViewInit {
  historyData!: HistoryData;
  userInfo!: string;
  userAddress!: string;
  historyElement!: HistoryElement[];
  constructor(
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
    this.historyElement = this.historyData.data.map((item: HistoryElement) => {
      const { id, startDate, endDate } = item;
      return {
        id,
        startDate,
        endDate,
      };
    });
    this.dataSource.data  = this.historyElement;
  }

  displayedColumns: string[] = ['id', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<HistoryElement>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngAfterViewInit() {
    // config paginator
    this.dataSource.paginator = this.paginator;
  }
}

export interface HistoryElement {
  id?: number;
  startDate?: Date;
  endDate?: Date;
  title?: string;
}

export interface HistoryData {
  data: HistoryElement[];
}
