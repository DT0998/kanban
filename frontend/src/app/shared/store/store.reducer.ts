import { ActionReducerMap } from '@ngrx/store';
import * as fromBoard from './board/board.reducer';
import * as fromPremium from './premium/permium.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface AppState {
  board: fromBoard.State;
  premium: fromPremium.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  board: fromBoard.boardReducer,
  premium: fromPremium.premiumReducer,
  auth: fromAuth.authReducer,
};
