import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

interface User {
  user_id: number;
  email: string;
  role: number;
  first_name: string;
  last_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  currentUser: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`, { withCredentials: true });
  }

  private fetchCurrentUser(): void {
    this.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        // console.log(this.currentUser);
      },
      error: () => (this.currentUser = null),
    });
  }

  signup(userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData).pipe(
      tap(() => this.router.navigate(['/login'])),
      catchError((error) => {
        console.error('Signup error:', error);
        return throwError(() => error);
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap(() => {
        this.fetchCurrentUser();
        this.router.navigate(['/']);
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.http.get(`${this.apiUrl}/logout`).subscribe({
      next: () => {
        this.currentUser = null;
        this.router.navigate(['/login']);
      },
    });
  }

  isAuthenticated(): boolean {
    if (this.currentUser != null) {
      return true;
    } else {
      return false;
    }
  }

  getUserRole(): number | null {
    return this.currentUser?.role || null;
  }
}
