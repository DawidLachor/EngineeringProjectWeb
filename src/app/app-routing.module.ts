import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from './registration/registration.component';
import {HomepageComponent} from "./homepage/homepage.component";
import {AddAnnouncementComponent} from "./add-announcement/add-announcement.component";
import {AnnouncementComponent} from "./announcement/announcement.component";
import {AnnouncementsComponent} from "./announcements/announcements.component";
import {MyAnnouncementComponent} from './my-announcement/my-announcement.component';
import { EdytujComponent } from './edytuj/edytuj.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {path: '', redirectTo: '/ogloszenia', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'rejestracja', component: RegistrationComponent},
  {path: 'dodanie_ogloszenia', component: AddAnnouncementComponent},
  {path: 'ogloszenia/:id', component: AnnouncementComponent},
  {path: 'ogloszenia', component: AnnouncementsComponent},
  {path: 'moje-ogloszenia', component: MyAnnouncementComponent},
  {path: 'edytuj/:id', component: EdytujComponent},
  {path: 'konto', component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
