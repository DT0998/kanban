import { AuthService } from './auth/auth.service';
import { BoardService } from './board/board.service';
import { DashboardService } from './dashboard/dashboard.service';

export const ShareService = [AuthService, BoardService, DashboardService];
