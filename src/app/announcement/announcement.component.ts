import {Component, NgZone, OnInit} from '@angular/core';
import {Announcements} from "../interfaca/announcements";
import {Announcement} from "../interfaca/announcement";
import {ActivatedRoute} from "@angular/router";
import { AnnouncementService } from './announcement.service';
import {MapsAPILoader} from "@agm/core";
import {FileUploadService} from "../add-announcement/file-upload.service";
import {Image} from "../interfaca/image";

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  announcement: Announcement | undefined;
  id: number;
  // @ts-ignore
  image: Image[];
  // @ts-ignore
  firstImage : Image;
  // @ts-ignore
  imagelength: number;

  constructor(private route: ActivatedRoute, private  service: AnnouncementService, private imageService: FileUploadService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    console.log(this.id);
    service.getAnnouncement(this.id).subscribe((announcement: Announcement) => {
      this.announcement = announcement;
      console.log(this.announcement);
      imageService.getFiles(this.id).subscribe( (image: Image[]) => {
        this.image = image;
        this.firstImage = this.image[0];
        this.imagelength = image.length;
        // this.image.shift();
        console.log(this.image);
      })
      }
    )
  }

  ngOnInit(): void {

  }

}
