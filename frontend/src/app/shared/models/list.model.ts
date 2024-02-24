import { Card } from './card.model';

export interface List {
  id: number;
  title: string;
  cards: Card[];
}
