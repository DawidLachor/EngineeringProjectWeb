import { Injectable } from '@angular/core';
import {AddAnnouncement} from "../interfaca/add-announcement";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EdytujService {

  constructor(private http: HttpClient) { }

  public editAnnouncement(id: number): Observable<AddAnnouncement> {
    return this.http.get<AddAnnouncement>('http://localhost:8080/api/announcement/edit/'+ id);
  }
}
