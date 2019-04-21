import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

class DecodedToken{
  exp: number = 0;
  username : string = '';
}

@Injectable()

export class AuthServices {
  private decodedToken;

  constructor( private http : HttpClient){
    this.decodedToken = JSON.parse(localStorage.getItem('bnb_meta')) || new DecodedToken();
  }

  private saveToken(token): string {
    this.decodedToken = jwt.decode(token);
    localStorage.setItem('bnb_auth', token);
    localStorage.setItem('bnb_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  private getExpiration(){
    return moment.unix(this.decodedToken.exp)
  }

  public register(userData): Observable<any> {
    return  this.http.post('api/v1/users/register', userData)
  }

  public login(userData): Observable<any> {
    return  this.http.post('api/v1/users/auth', userData).map( (token) => this.saveToken(token) );
  }


  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }


  public logout(){
    localStorage.removeItem('bnb_auth');
    localStorage.removeItem('bnb_meta');

    this.decodedToken = new DecodedToken();
  }

  public getAuthToken(){
    return localStorage.getItem('bnb_auth')
  }

  public getUsername(){
    return this.decodedToken.username;
  }
}
