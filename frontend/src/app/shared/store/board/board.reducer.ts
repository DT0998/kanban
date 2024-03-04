import { Board } from '../../models/board.model';
import { Card } from '../../models/card.model';
import { List } from '../../models/list.model';
import * as BoardActions from './board.actions';

export interface State {
  boardList: Board[];
}
const initialState: State = {
  boardList: [],
};

// Add list to board
function addListToBoard(
  boardList: Board[],
  list: List,
  boardId: number
): Board[] {
  return boardList.map((board) => {
    if (board.background.id === boardId) {
      return {
        ...board,
        lists: [...board.lists, list],
      };
    }
    return board;
  });
}

// Add card to list
function addCardToList(
  boardList: Board[],
  card: Card,
  listId: number
): Board[] {
  return boardList.map((board) => ({
    ...board,
    lists: board.lists.map((list) => ({
      ...list,
      cards: list.id === listId ? [...list.cards, card] : list.cards,
    })),
  }));
}

export function boardReducer(
  state = initialState,
  action: BoardActions.BoardActions
): State {
  switch (action.type) {
    case BoardActions.ADD_BOARD:
      return {
        ...state,
        boardList: [...state.boardList, action.payload],
      };
    case BoardActions.ADD_LIST:
      const { list, boardId } = action.payload;
      const newBoardList = addListToBoard(state.boardList, list, boardId);
      return {
        ...state,
        boardList: newBoardList,
      };
    case BoardActions.ADD_CARD:
      const { card, listId } = action.payload;
      const newBoardListWithCard = addCardToList(state.boardList, card, listId);
      return {
        ...state,
        boardList: newBoardListWithCard,
      };
    default:
      return state;
  }
}
