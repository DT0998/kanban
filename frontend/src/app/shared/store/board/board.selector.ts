import { AppState } from '../store.reducer';

export const selectBoardList = (state: AppState) => state.board.boardList;
