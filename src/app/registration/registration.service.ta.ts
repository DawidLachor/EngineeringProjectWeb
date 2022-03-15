import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../login/login";
import {Observable} from "rxjs";
import {Token} from "../token";
import {RegisterRequest} from "./registerRequest";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {}

  public registerService(register: RegisterRequest): Observable<string>{
    return this.http.post<string>('http://localhost:8080/api/registration', register);
  }
}
