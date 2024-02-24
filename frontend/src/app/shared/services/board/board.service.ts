import { Injectable } from '@angular/core';
import { Card } from '../../models/card.model';

Injectable({
  providedIn: 'root',
});
export class BoardService {
  openList: boolean;
  openCardIndex: number | null;
  constructor() {
    this.openList = false;
    this.openCardIndex = null;
  }
  handleOpenList() {
    this.openList = true;
  }
  handleOpenCard(index: number) { 
    this.openCardIndex = index;
  }
  handleCloseCard() { 
    this.openCardIndex = null;
  }
  handleCloseOverlayAndIcon() {
    this.openList = false;
    this.openCardIndex = null;
  }
}
