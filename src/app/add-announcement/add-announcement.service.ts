import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AddAnnouncement} from "../interfaca/add-announcement";
import {Observable} from "rxjs";
import {Announcements} from "../interfaca/announcements";

@Injectable({
  providedIn: 'root'
})
export class AddAnnouncementService {

  constructor(private http: HttpClient) { }

  public addAnnouncement(add: AddAnnouncement): Observable<number> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + localStorage.getItem('authenticationToken'))
    headers = headers.append("Access-Control-Allow-Origin", "*")
    return this.http.post<number>('http://localhost:8080/api/announcement',add, {headers: headers});
  }
}
