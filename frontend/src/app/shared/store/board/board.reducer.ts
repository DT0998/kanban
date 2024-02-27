import { Board } from '../../models/board.model';
import * as BoardActions from './board.actions';

export interface State {
  boardList: Board[];
}
const initialState: State = {
  boardList: [],
};

export function boardReducer(
  state = initialState,
  action: BoardActions.BoardActions
) {
  switch (action.type) {
    default:
      return state;
  }
}
