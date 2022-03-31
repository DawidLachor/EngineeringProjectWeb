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
import {NavigationService} from "../navigation/navigation.service";
import {Router} from "@angular/router";

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

  constructor(private homepage: HomepageService,private router: Router, private service: MyAnnouncementService, private navigationService: NavigationService) {

  }
  signin: boolean = false;

  ngOnInit(): void {
    this.signin = this.navigationService.checkJWT();
    if(!this.signin){
      this.router.navigate(['']);
    }
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
