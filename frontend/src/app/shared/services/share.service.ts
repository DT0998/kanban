import { AuthApiService } from './api/auth/auth-api.service';
import { HistoryApiService } from './api/history/history-api.service';
import { PremiumApiService } from './api/premium/premium-api.service';
import { ProfileApiService } from './api/profile/profile-api.service';
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
  PremiumApiService,
  HistoryApiService,
  ProfileApiService,
  AuthApiService,
];
