import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Login} from "../login/login";
import {Observable} from "rxjs";
import {Token} from "../token";
import {Account} from "../interfaca/account";
import {Announcements} from "../interfaca/announcements";
import { Password } from '../interfaca/password';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(private http: HttpClient) {}

  public getAccount(): Observable<Account> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + localStorage.getItem('authenticationToken'))
    headers = headers.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Account>('http://localhost:8080/api/account',{headers: headers});
  }

  public changePassword(password: Password): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + localStorage.getItem('authenticationToken'))
    headers = headers.append("Access-Control-Allow-Origin", "*")
    return this.http.post<boolean>('http://localhost:8080/api/account',password, {headers: headers});
  }
}
