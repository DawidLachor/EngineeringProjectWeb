import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../login/login";
import { BodyType } from '../interfaca/body-type';
import {Observable} from "rxjs";
import {Brand} from "../interfaca/brand";
import {TypeEngine} from "../interfaca/type-engine";
import {Model} from "../interfaca/model";
import {Generation} from "../interfaca/generation";

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) {}

  public getTypeBody(): Observable<BodyType[]> {
    return this.http.get<BodyType[]>('http://localhost:8080/api/bodyType');
  }

  public getTypeEngine(): Observable<TypeEngine[]> {
    return this.http.get<TypeEngine[]>('http://localhost:8080/api/typeEngineList');
  }

  public getBrand(): Observable<Brand[]> {
    return this.http.get<Brand[]>('http://localhost:8080/api/mark');
  }

  public getModel(idMark: number): Observable<Model[]> {
    return this.http.get<Model[]>('http://localhost:8080/api/' + idMark + '/model');
  }

  public getGeneration(idModel: number): Observable<Generation[]> {
    return this.http.get<Generation[]>('http://localhost:8080/api/' + idModel + '/generation');
  }
}
