import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {LoginService} from "./login/login.service";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { RegistrationComponent } from './registration/registration.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { FiltrComponent } from './filtr/filtr.component';
import {AgmCoreModule} from "@agm/core";
import { MyAnnouncementComponent } from './my-announcement/my-announcement.component';
import { EdytujComponent } from './edytuj/edytuj.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavigationComponent,
    HomepageComponent,
    AddAnnouncementComponent,
    AnnouncementComponent,
    AnnouncementsComponent,
    FiltrComponent,
    MyAnnouncementComponent,
    EdytujComponent,
    AccountComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgkjgwLEnrfti1MejIfZUYk1Jx3ZozPxg',
      libraries: ['places']
    })
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
