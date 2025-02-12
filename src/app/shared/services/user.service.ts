import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../model/user';
import {map, Observable, tap} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL_USERS = 'http://localhost:3000/users';

  private currentUser: User | null = null;

  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL_USERS);
  }

  getUserById(id: string):Observable<User> {
    return this.http.get<User>(`${this.URL_USERS}/${id}`);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.URL_USERS}?email=${email}&password=${password}`)
      .pipe(
        map(users => users[0]),
        tap(user => this.currentUser = user)
      );
  }


  register(user: User): Observable<User> {
    return this.http.post<User>(this.URL_USERS, user);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
  }
}
