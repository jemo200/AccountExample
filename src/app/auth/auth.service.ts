import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  message = '';

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  login(email, password): Observable<Object> {
    const obj = {
      email: email,
      password: password
    };
    return this.http.post('http://localhost:4000/login', obj, {withCredentials: true});
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
