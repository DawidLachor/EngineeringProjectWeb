import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { RegistrationComponent } from './registration/registration.component';
import {HomepageComponent} from "./homepage/homepage.component";
import {AddAnnouncementComponent} from "./add-announcement/add-announcement.component";
import {AnnouncementComponent} from "./announcement/announcement.component";
import {AnnouncementsComponent} from "./announcements/announcements.component";

const routes: Routes = [
  {path: '', redirectTo: '/homepage', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'rejestracja', component: RegistrationComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'dodanie_ogloszenia', component: AddAnnouncementComponent},
  {path: 'ogloszenie', component: AnnouncementComponent},
  {path: 'ogloszenia', component: AnnouncementsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
