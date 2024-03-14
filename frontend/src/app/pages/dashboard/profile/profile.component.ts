import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../../shared/services/http/http.service';
import { ProfileService } from '../../../shared/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(
    public httpService: HttpService,
    public profileService: ProfileService
  ) {}
  ngOnInit(): void {
    this.getProfile();
  }
  getProfile() {
    this.profileService.getProfile();
  }
}
