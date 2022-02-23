import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
  };
  apiURI = 'http://localhost:5000/api/users/';
  // apiURI = "https://hame-comestic-api.herokuapp.com/api/users/"
  constructor(private http: HttpClient) {}

  login(user: { username: string; password: string }): Observable<User[]> {
    console.log(user);
    return this.http
      .post<User[]>(`${this.apiURI}login`, {
        username: user.username,
        password: user.password,
      })
      .pipe();
  }
  register(user: { username: string; password: string, emailAddress: string, phoneNumber: string}): Observable<User[]> {
    return this.http
      .post<User[]>(`${this.apiURI}add-user`, {
        username: user.username,
        password: user.password,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber
      })
      .pipe();
  }
}
