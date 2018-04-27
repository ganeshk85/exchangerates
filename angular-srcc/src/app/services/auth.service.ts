import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//import { Http, Headers } from '@angular/http';
//import { HttpModule } from '@angular/http';
//import 'rxjs/add/operator/map';
//import { User } from '../models/User';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  
  protected basePath = 'http://exchangerates-gkhandare.c9users.io:8080';
  public defaultHeaders = new HttpHeaders();

  constructor(protected http: HttpClient) {
      //this.isDev = true;  // Change to false before deployment
  }

  registerUser(user): Observable<any> {
    let body = JSON.stringify(user);
    
    if (body === null || body === undefined) {
        throw new Error('Required parameter body was null or undefined when calling createUser.');
    }

    let headers = this.defaultHeaders;
    headers = headers.set("Content-Type", 'application/json');
    
    return this.http.post<any>(`${this.basePath}/users/register`,
            body,
            {
                headers: headers
            }
        );
  }

  authenticateUser(user):Observable<any> {
    let body = JSON.stringify(user);
    
    if (body === null || body === undefined) {
        throw new Error('Required parameter body was null or undefined when calling createUser.');
    }

    let headers = this.defaultHeaders;
    headers = headers.set("Content-Type", 'application/json');
    
    return this.http.post<any>(`${this.basePath}/users/authenticate`, 
      body, 
      {
        headers: headers
      }
    );
  }

  getProfile():Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set("Content-Type", 'application/json');
    
    this.loadToken();
    headers = headers.set('Authorization', this.authToken);
    
    return this.http.get<any>(`${this.basePath}/users/profile`, 
      {
        headers: headers
      }
    );
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}