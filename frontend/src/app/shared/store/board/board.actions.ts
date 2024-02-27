import { Action } from '@ngrx/store';
import { Board } from '../../models/board.model';

export const ADD_BOARD = '[Board] Add Board';

export class AddBoard implements Action {
  readonly type = ADD_BOARD;
  constructor(public payload: Board) {}
}

export type BoardActions = AddBoard;