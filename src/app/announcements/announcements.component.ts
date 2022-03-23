import { Component, OnInit } from '@angular/core';
import {BodyType} from "../interfaca/body-type";
import {TypeEngine} from "../interfaca/type-engine";
import {Brand} from "../interfaca/brand";
import {Model} from "../interfaca/model";
import {Generation} from "../interfaca/generation";
import {HomepageService} from "../homepage/homepage.service";
import {NgForm} from "@angular/forms";
import {AnnouncementsService} from "./announcements.service";
import {Announcements} from "../interfaca/announcements";
import {Image} from "../interfaca/image";
import {FileUploadService} from "../add-announcement/file-upload.service";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

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
  disabledModel: boolean;
  disabledGeneration: boolean;

  constructor(private homepage: HomepageService, private  service: AnnouncementsService, private imageService: FileUploadService) {
    this.homepage.getTypeBody().subscribe((bodyTypes: BodyType[]) => {
        this.bodyTypes = bodyTypes;
      }
    );

    this.homepage.getTypeEngine().subscribe((typeEngine: TypeEngine[]) => {
        this.typeEngines = typeEngine;
      }
    );

    this.homepage.getBrand().subscribe((brands: Brand[]) => {
        this.brands = brands;
      }
    );
    this.disabledModel = false;
    this.disabledGeneration = false;
  }

  ngOnInit(): void {
    this.getAllAnnouncements();
  }

  search(searchForm: NgForm): void {
    console.log(searchForm.value)
  }

  getModel(brandId: number) {
    console.log(brandId)
    this.disabledModel = true;
    this.homepage.getModel(brandId).subscribe((models: Model[]) => {
        this.models = models;
      }
    );
  }

  getGeneration(modelId: number) {
    console.log(modelId)
    this.disabledGeneration = true;
    this.homepage.getGeneration(modelId).subscribe((generations: Generation[]) => {
        this.generations = generations;
      }
    );
  }

  getAnnouncements(searchForm: NgForm | undefined){
    // @ts-ignore
    console.log(searchForm.value);
    // @ts-ignore
    this.service.getAnnouncements(searchForm.value).subscribe((announcements : Announcements[]) =>{
      this.announcements = announcements;
      // this.imageService.getFiles(this.id).subscribe( (image: Image[]) => {
      //   this.image = image;
      //   this.imagelength = image.length
      //   console.log(this.image);
      // })
    });

  }

  getAllAnnouncements(){
    this.service.getAllAnnouncements().subscribe((announcements : Announcements[]) =>{
      this.announcements = announcements;
    });


  }

}
