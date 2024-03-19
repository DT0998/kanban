import { AuthService } from './auth/auth.service';
import { BoardService } from './board/board.service';
import { DashboardService } from './dashboard/dashboard.service';
import { HistoryService } from './history/history.service';
import { HttpService } from './http/http.service';
import { LocalStorageService } from './localStorage/localStorage.service';
import { ModalConfirmPremiumService } from './modal-confirm-premium/modal-confirm-premium.service';
import { ProfileService } from './profile/profile.service';
import { WagmiService } from './wagmi/wagmi.service';

export const ShareService = [
  BoardService,
  DashboardService,
  WagmiService,
  HttpService,
  LocalStorageService,
  AuthService,
  ProfileService,
  ModalConfirmPremiumService,
  HistoryService,
];
