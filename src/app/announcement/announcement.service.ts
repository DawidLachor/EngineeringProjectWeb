import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FiltrAnnouncement} from "../interfaca/filtr-announcement";
import {Observable} from "rxjs";
import {Announcements} from "../interfaca/announcements";
import {Announcement} from "../interfaca/announcement";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

  public getAnnouncement(id: number): Observable<Announcement> {
    return this.http.get<Announcement>('http://localhost:8080/api/announcement/'+id);
  }
}
