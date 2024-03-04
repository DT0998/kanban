import { ListBackground } from '../constants/modal-board.contanst';
import { List } from './list.model';

export interface Board {
  title: string;
  background: ListBackground;
  lists: List[];
}
