import { Component, OnInit } from '@angular/core';
import {BodyType} from "../interfaca/body-type";
import {TypeEngine} from "../interfaca/type-engine";
import {Brand} from "../interfaca/brand";
import {Model} from "../interfaca/model";
import {Generation} from "../interfaca/generation";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {HomepageService} from "../homepage/homepage.service";
import {AddAnnouncementService} from "../add-announcement/add-announcement.service";
import {FileUploadService} from "../add-announcement/file-upload.service";
import {NgForm} from "@angular/forms";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {EdytujService} from "./edytuj.service";
import {AddAnnouncement} from "../interfaca/add-announcement";

@Component({
  selector: 'app-edytuj',
  templateUrl: './edytuj.component.html',
  styleUrls: ['./edytuj.component.css']
})
export class EdytujComponent implements OnInit {

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
  id: number;
  // @ts-ignore
  addAnnouncementData: AddAnnouncement;
  crash: number | undefined

  constructor(private route: ActivatedRoute, private router: Router, private homepage: HomepageService, private editService: EdytujService, private addAnnouncementService: AddAnnouncementService, private uploadService: FileUploadService) {
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

    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    editService.editAnnouncement(this.id).subscribe((addAnnouncement: AddAnnouncement) => {
      this.addAnnouncementData = addAnnouncement;
      this.getModel(this.addAnnouncementData.brand)
      this.getGeneration(this.addAnnouncementData.model)
      this.addAnnouncementData.transmission -= 1;
      this.addAnnouncementData.brand -= 1;
      this.addAnnouncementData.model -= 1;
      this.addAnnouncementData.generation -= 1;
      this.addAnnouncementData.bodyType -= 1;
      this.addAnnouncementData.gas -= 1;
      if(this.addAnnouncementData.crash){
        this.crash = 0
      } else {
        this.crash = 1
      }
      console.log(this.addAnnouncementData)
    })
  }

  ngOnInit(): void {
    // this.imageInfos = this.uploadService.getFiles();
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
