import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// @ts-ignore
import * as bcrypt from 'bcryptjs';
import { capitalizeFirstLetter } from "../../ui-kit/utils/string-utils";

export interface User {
  name: string;
  email: string;
  password?: string;
}

const USER_KEY = "currentUser";
const USERS_LIST_KEY = "registeredUsersList";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isSignUpVisible$ = new BehaviorSubject(false);
  isLoginVisible$ = new BehaviorSubject(false);

  constructor() {
  }

  public currentUser$ = new BehaviorSubject<User | null>(null);

  public fetchUser(): Observable<User> {
    return new Observable((observer) => {
      setTimeout(() => {
        const userJson = localStorage.getItem(USER_KEY);
        if (userJson) {
          const user: User = JSON.parse(userJson);
          this.currentUser$.next(user);
          observer.next(user);
          observer.complete();
        } else {
          this.logout();
        }
      }, 500);
    });
  }

  public login(email: string, password: string): Observable<User> {
    const users = localStorage.getItem(USERS_LIST_KEY);
    const list = users ? JSON.parse(users) : [];
    return new Observable(observer => {
      const user = list.find((u: User) => u.email === email);
      if (user && bcrypt.compareSync(password, user.password)) {
        console.log(list, user)
        this.currentUser$.next(user);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        observer.next(user);
      } else {
        observer.error('Invalid email or password');
      }
      observer.complete();
    });
  }

  public logout(): void {
    localStorage.removeItem(USER_KEY);
    this.currentUser$.next(null);
  }

  public register(
    name: string,
    email: string,
    password: string): Observable<User> {
    const passwordHash = bcrypt.hashSync(password, 10);
    const user: User = {
      name: capitalizeFirstLetter(name),
      email,
      password: passwordHash
    };

    const users = localStorage.getItem(USERS_LIST_KEY);
    if (users) {
      const list = JSON.parse(users);
      const emailExist = list.find((usr: User) => usr.email === email);
      if (emailExist) {
        return new Observable(observer => {
          observer.error('Email already exists');
          observer.complete();
        });
      }
      list.push(user);
      localStorage.setItem(USERS_LIST_KEY, JSON.stringify(list));
    } else {
      localStorage.setItem(USERS_LIST_KEY, JSON.stringify([user]));
    }

    // login
    this.currentUser$.next(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return new Observable<User>(observer => {
      observer.next(user);
      observer.complete();
    });
  }
}
