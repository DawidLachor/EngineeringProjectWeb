import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterService} from "./registration.service.ta";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  signup: boolean = false;
  message: string | undefined;
  constructor(private registerService: RegisterService, private router: Router) {
  }
  ngOnInit(): void {
  }

  public register(registerForm: NgForm): void {
    this.registerService.registerService(registerForm.value).subscribe(
      value => {
        this.router.navigate([''])
      },error => {
        this.message = error.message
        this.signup=true;
      }
    )
  }
}
