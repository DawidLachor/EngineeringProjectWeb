import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {Token} from "../token";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signin: boolean = false;
  constructor(private loginService: LoginService,  private router: Router) {
  }

  public login(loginForm: NgForm): void{
    this.loginService.login(loginForm.value).subscribe(
      (response: Token) => {

        localStorage.setItem('authenticationToken', response.authenticationToken)

        window.location.reload();
        this.router.navigate(['/']);

      },
      (error : HttpErrorResponse) => {
        this.signin = true;
      }
    )
  }

  ngOnInit(): void {
  }

}
