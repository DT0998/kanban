import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../../shared/services/http/http.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(public httpService: HttpService) {}
}
