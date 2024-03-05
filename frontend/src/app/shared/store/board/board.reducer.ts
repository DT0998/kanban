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
  boardId: string
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
  listId: string
): Board[] {
  return boardList.map((board) => ({
    ...board,
    lists: board.lists.map((list) => ({
      ...list,
      cards: list.id === listId ? [...list.cards, card] : list.cards,
    })),
  }));
}

// update position card
function updatePositionCardList(
  currentCards: Card[],
  previousCards: Card[],
  currentIndexCard: number,
  previousIndexCard: number,
  currentListId: string,
  previousListId: string,
  boardList: Board[]
): Board[] {
  if (currentListId === previousListId) {
    console.log('move same list');
    const newCurrentCardList = moveCardInCardList(
      currentCards,
      currentIndexCard,
      previousIndexCard
    );
    return boardList.map((board) => ({
      ...board,
      lists: board.lists.map((list) =>
        // convert string to number
        list.id === currentListId
          ? {
              ...list,
              cards: newCurrentCardList,
            }
          : list
      ),
    }));
  } else {
    const { newCurrentCardList, newPreviousCardList } =
      transferCardToOtherCardList(
        currentCards,
        previousCards,
        currentIndexCard,
        previousIndexCard
      );
    return boardList.map((board) => ({
      ...board,
      lists: board.lists.map((list) =>
        list.id === currentListId
          ? { ...list, cards: newCurrentCardList }
          : list.id === previousListId
          ? { ...list, cards: newPreviousCardList }
          : list
      ),
    }));
  }
}

// move same list
function moveCardInCardList(
  currentCards: Card[],
  currentIndexCard: number,
  previousIndexCard: number
): Card[] {
  const newCardList = [...currentCards];
  // card item move
  const [movedCard] = newCardList.splice(previousIndexCard, 1);
  newCardList.splice(currentIndexCard, 0, movedCard);
  return newCardList;
}

// move different list
function transferCardToOtherCardList(
  currentCards: Card[],
  previousCards: Card[],
  currentIndexCard: number,
  previousIndexCard: number
): any {
  const newCurrentCardList = [...currentCards];
  const newPreviousCardList = [...previousCards];
  // card item move
  const [movedCard] = newPreviousCardList.splice(previousIndexCard, 1);
  newCurrentCardList.splice(currentIndexCard, 0, movedCard);
  return { newCurrentCardList, newPreviousCardList };
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
      const { card, listId: addListId } = action.payload;
      const newBoardListWithCard = addCardToList(
        state.boardList,
        card,
        addListId
      );
      return {
        ...state,
        boardList: newBoardListWithCard,
      };
    case BoardActions.UPDATE_POSITION_CARD:
      const {
        currentCards,
        previousCards,
        currentIndexCard,
        previousIndexCard,
        currentListId,
        previousListId,
      } = action.payload;
      const newBoardListWithUpdatePositionCard = updatePositionCardList(
        currentCards,
        previousCards,
        currentIndexCard,
        previousIndexCard,
        currentListId,
        previousListId,
        state.boardList
      );
      return {
        ...state,
        boardList: newBoardListWithUpdatePositionCard,
      };
    default:
      return state;
  }
}
