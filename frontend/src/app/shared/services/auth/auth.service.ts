import { Injectable } from '@angular/core';

Injectable({
  providedIn: 'root',
});
export class AuthService {
  getAuthorizationToken() {
    return 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmNkYjA4OTQ2MjZiYTQyODZjMWQ2YmQ0MTc5MTI0OSIsInN1YiI6IjYxZTk2Y2JkY2QyMDQ2MDA5MjJmOWI0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fQnsFjLzKHOuxjjDe50PxICN1qRaBWAp5iS0GRfKa8Q';
  }
}
