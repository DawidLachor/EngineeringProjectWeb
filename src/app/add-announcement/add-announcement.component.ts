import { Component, OnInit } from '@angular/core';
import {BodyType} from "../interfaca/body-type";
import {TypeEngine} from "../interfaca/type-engine";
import {Brand} from "../interfaca/brand";
import {Model} from "../interfaca/model";
import {Generation} from "../interfaca/generation";
import {HomepageService} from "../homepage/homepage.service";
import {NgForm} from "@angular/forms";
import {AddAnnouncementService} from "./add-announcement.service";

import {Observable} from "rxjs";
import {FileUploadService} from "./file-upload.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {NavigationService} from "../navigation/navigation.service";

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit {

  bodyTypes: BodyType[] | undefined;
  typeEngines: TypeEngine[] | undefined;
  brands: Brand[] | undefined;
  models: Model[] | undefined;
  idBrandSelector: BodyType | undefined;
  idModelSelector: Model | undefined;
  generations: Generation[] | undefined;
  disabledModel: boolean;
  disabledGeneration: boolean;
  announcementObject: number | undefined;

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;

  constructor(private router: Router,private navigationService: NavigationService, private homepage: HomepageService, private addAnnouncementService: AddAnnouncementService, private uploadService: FileUploadService) {
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

  signin: boolean = false;

  ngOnInit(): void {
    this.signin = this.navigationService.checkJWT();
    if(!this.signin){
      this.router.navigate(['']);
    }
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

  addAnnouncement(addForm: NgForm) {
    console.log(addForm.value);
    this.addAnnouncementService.addAnnouncement(addForm.value).subscribe((id : number) =>{
      this.uploadFiles(id)
      });
    this.router.navigate(['']);
    window.location.reload();
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  uploadFiles(announcementId: number): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i], announcementId);
      }
    }
  }

  upload(idx: number, file: File, announcementId: number): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      this.uploadService.upload(file, announcementId).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            // this.imageInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
          // this.imageInfos = this.uploadService.getFiles();
        }
      });
    }
  }
}
