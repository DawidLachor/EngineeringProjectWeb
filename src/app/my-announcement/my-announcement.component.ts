import { Component, OnInit } from '@angular/core';
import {BodyType} from "../interfaca/body-type";
import {TypeEngine} from "../interfaca/type-engine";
import {Brand} from "../interfaca/brand";
import {Model} from "../interfaca/model";
import {Generation} from "../interfaca/generation";
import {Announcements} from "../interfaca/announcements";
import {HomepageService} from "../homepage/homepage.service";
import {AnnouncementsService} from "../announcements/announcements.service";
import {FileUploadService} from "../add-announcement/file-upload.service";
import {NgForm} from "@angular/forms";
import {MyAnnouncementService} from "./my-announcement.service";

@Component({
  selector: 'app-my-announcement',
  templateUrl: './my-announcement.component.html',
  styleUrls: ['./my-announcement.component.css']
})
export class MyAnnouncementComponent implements OnInit {
  bodyTypes: BodyType[] | undefined;
  typeEngines: TypeEngine[] | undefined;
  brands: Brand[] | undefined;
  models: Model[] | undefined;
  idBrandSelector: BodyType | undefined;
  idModelSelector: Model | undefined;
  idBodyTypeSelector: BodyType | undefined;
  idTypeEnginesSelector: TypeEngine | undefined;
  generations: Generation[] | undefined;
  announcements: Announcements[] | undefined;

  constructor(private homepage: HomepageService, private service: MyAnnouncementService, private imageService: FileUploadService) {

  }

  ngOnInit(): void {
    this.getAllAnnouncements();
  }

  search(searchForm: NgForm): void {
    console.log(searchForm.value)
  }

  getAllAnnouncements(){
    this.service.getAllAnnouncements().subscribe((announcements : Announcements[]) =>{
      this.announcements = announcements;
    });


  }

  delete(id: number) {
    this.service.delete(id).subscribe(value => {
      window.location.reload();
    });
  }
}
