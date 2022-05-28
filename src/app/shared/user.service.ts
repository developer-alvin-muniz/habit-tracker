import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../models/User";
import {JwtInterceptor} from "../jwt.interceptor";
import {LoginRequestModel, LoginResponse} from "../models/login-request.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userEvents = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private httpInterceptor: JwtInterceptor) {
    this.retrieveUser();
  }

  register(username: string, password: string): Observable<User> {
    const credentials = {
      username:username,
      password: password
    }

    return this.http.post<User>(`${environment.apiEndpoint}/auth/users/register`,credentials);
  }

  loginUser(loginRequest: LoginRequestModel): Observable<LoginResponse>  {
    return this.http
      .post<LoginResponse>(`http://localhost:8080/auth/users/login`, loginRequest);
  }

  storeLoggedInUser(user: User) {
    this.userEvents.next(user);
    this.httpInterceptor.setJwtToken(user.token);
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
  }

  retrieveUser() {
    const userString = window.localStorage.getItem('rememberMe');
    if (userString) {
      const user = JSON.parse(userString) as User;
      this.userEvents.next(user);
      this.httpInterceptor.setJwtToken(user.token);
    } else {
    }
  }

  logout() {
    this.userEvents.next(null);
    window.localStorage.removeItem('rememberMe');
    this.httpInterceptor.removeJwtToken();
  }




}
