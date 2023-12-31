import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionAddOutline, ionCloseOutline } from '@ng-icons/ionicons';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({
      ionAddOutline,
      ionCloseOutline,
    }),
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  public isAddList: boolean;
  constructor() {
    this.isAddList = false;
  }

  handleAddList(event: Event) {
    event.stopPropagation();
    this.isAddList = !this.isAddList;
  }

  handleBackgroundClose() {
    this.isAddList = false;
  }
}
