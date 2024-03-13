import { BoardService } from './board/board.service';
import { DashboardService } from './dashboard/dashboard.service';
import { HttpService } from './http/http.service';
import { LocalStorageService } from './localStorage/localStorage.service';
import { WagmiService } from './wagmi/wagmi.service';

export const ShareService = [
  BoardService,
  DashboardService,
  WagmiService,
  HttpService,
  LocalStorageService,
];
