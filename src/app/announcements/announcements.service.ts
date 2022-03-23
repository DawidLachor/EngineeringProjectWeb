import { Injectable } from '@angular/core';
import {AddAnnouncement} from "../interfaca/add-announcement";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FiltrAnnouncement} from "../interfaca/filtr-announcement";
import {Announcements} from "../interfaca/announcements";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

  constructor(private http: HttpClient) { }

  public getAnnouncements(filter: FiltrAnnouncement): Observable<Announcements[]> {
    return this.http.post<Announcements[]>('http://localhost:8080/api/announcements',filter );
  }

  public getAllAnnouncements(): Observable<Announcements[]> {
    return this.http.get<Announcements[]>('http://localhost:8080/api/announcements');
  }
}
