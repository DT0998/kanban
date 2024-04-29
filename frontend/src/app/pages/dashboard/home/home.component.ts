import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../shared/services/profile/profile.service';
import { LocalStorageService } from '../../../shared/services/localStorage/localStorage.service';
import { WagmiService } from '../../../shared/services/wagmi/wagmi.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../shared/store/store.reducer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    public profileService: ProfileService,
    public localStorageService: LocalStorageService,
    public wagmiService: WagmiService,
    public store: Store<fromApp.AppState>
  ) { }

  ngOnInit() { }
}
