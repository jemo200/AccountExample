import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  uri = 'http://localhost:4000/account';

  constructor(private http: HttpClient) { }

  addAccount(username, email, password) {
    const obj = {
      username: username,
      email: email,
      password: password
    };
    this.http.post(`${this.uri}/create`, obj)
        .subscribe(res => console.log('Done'));
  }

  getAccounts() {
    return this
           .http
           .get(`${this.uri}`);
  }

  editAccount(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
    }

  updateAccount(username, email, password, id) {

    const obj = {
      username: username,
      email: email,
      password: password
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

 deleteAccount(id) {
    return this
              .http
              .get(`${this.uri}/delete/${id}`);
  }
}
