import { Action } from '@ngrx/store';
import { Board } from '../../models/board.model';
import { List } from '../../models/list.model';
import { Card } from '../../models/card.model';

export const ADD_BOARD = '[Board] ADD_BOARD';
export const ADD_LIST = '[Board] ADD_LIST';
export const ADD_CARD = '[Board] ADD_CARD';
export const UPDATE_POSITION_CARD = '[Board] UPDATE_POSITION_CARD';

export class AddBoard implements Action {
  readonly type = ADD_BOARD;
  constructor(public payload: Board) {}
}

export class AddList implements Action {
  readonly type = ADD_LIST;
  constructor(public payload: { list: List; boardId: string | undefined }) {}
}

export class AddCard implements Action {
  readonly type = ADD_CARD;
  constructor(public payload: { card: Card; listId: string }) {}
}

export class UpdatePositionCard implements Action {
  readonly type = UPDATE_POSITION_CARD;
  constructor(
    public payload: {
      previousCards: Card[];
      currentCards: Card[];
      previousIndexCard: number;
      currentIndexCard: number;
      currentListId: number | string;
      previousListId: number | string;
    }
  ) {}
}

export type BoardActions =
  | AddBoard
  | AddList
  | AddCard
  | UpdatePositionCard
  | any;
