import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as Rx from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class UserService {
  logger = new Rx.BehaviorSubject(false)

  constructor() {
    const user = localStorage.getItem('currentUser');
    if(user){
      const userParse = JSON.parse(user)
      if(userParse._id){
        this.logger.next(true)
      }
    }
  }
  logIn(userInfo: User) {
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
    this.logger.next(true)
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.logger.next(false)
  }

  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable()
  }
}
