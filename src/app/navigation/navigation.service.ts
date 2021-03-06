import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  jwt: boolean = false;
  constructor() { }

  //Sprawdzenie tokena JWT
  checkJWT(): boolean{
    //Sprawdzamy, czy istnieje w cookies taki token
    let token = localStorage.getItem('authenticationToken');
    this.jwt = !!token;
    return this.jwt;
  }
}
