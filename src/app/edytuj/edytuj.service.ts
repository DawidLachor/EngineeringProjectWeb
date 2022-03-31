import { Injectable } from '@angular/core';
import {AddAnnouncement} from "../interfaca/add-announcement";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EditAnnouncement} from "../interfaca/edit-announcement";

@Injectable({
  providedIn: 'root'
})
export class EdytujService {

  constructor(private http: HttpClient) { }

  public editAnnouncement(id: number): Observable<EditAnnouncement> {
    return this.http.get<EditAnnouncement>('http://localhost:8080/api/announcement/edit/'+ id);
  }

  public saveAnnouncement(announcement: EditAnnouncement, idCar: number, idAnnouncement: number): Observable<void> {
    announcement.id = idAnnouncement;
    announcement.idCar = idCar;
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + localStorage.getItem('authenticationToken'))
    headers = headers.append("Access-Control-Allow-Origin", "*")
    return this.http.put<void>('http://localhost:8080/api/announcement/edit/', announcement, {headers: headers});
  }
}
