import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FiltrAnnouncement} from "../interfaca/filtr-announcement";
import {Observable} from "rxjs";
import {Announcements} from "../interfaca/announcements";
import {AddAnnouncement} from "../interfaca/add-announcement";

@Injectable({
  providedIn: 'root'
})
export class MyAnnouncementService {

  constructor(private http: HttpClient) { }

  public getAllAnnouncements(): Observable<Announcements[]> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + localStorage.getItem('authenticationToken'))
    headers = headers.append("Access-Control-Allow-Origin", "*")
    return this.http.post<Announcements[]>('http://localhost:8080/api/announcements/my-announcement',null,{headers: headers});
  }

  public delete(id: number): Observable<Announcements[]> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + localStorage.getItem('authenticationToken'))
    headers = headers.append("Access-Control-Allow-Origin", "*")
    return this.http.post<Announcements[]>('http://localhost:8080/api/announcements/my-announcement/delete',id,{headers: headers});
  }
}
