import { Action } from '@ngrx/store';
import { Board } from '../../models/board.model';
import { List } from '../../models/list.model';
import { Card } from '../../models/card.model';

export const ADD_BOARD = '[Board] ADD_BOARD';
export const ADD_LIST = '[Board] ADD_LIST';
export const ADD_CARD = '[Board] ADD_CARD';

export class AddBoard implements Action {
  readonly type = ADD_BOARD;
  constructor(public payload: Board) {}
}

export class AddList implements Action {
  readonly type = ADD_LIST;
  constructor(public payload: { list: List; boardId: number | undefined }) {}
}

export class AddCard implements Action {
  readonly type = ADD_CARD;
  constructor(public payload: { card: Card; listId: number }) {}
}

export type BoardActions =
  | AddBoard
  | AddList
  | AddCard
  | any;
