import { ActionReducerMap } from '@ngrx/store';
import * as fromBoard from './board/board.reducer';
import * as fromPremium from './premium/permium.reducer';

export interface AppState {
  board: fromBoard.State;
  premium: fromPremium.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  board: fromBoard.boardReducer,
  premium: fromPremium.premiumReducer,
};
