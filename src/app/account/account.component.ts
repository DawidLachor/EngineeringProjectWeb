import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";
import {AccountService} from "./account.service";
import {NgForm} from "@angular/forms";
import {Account} from "../interfaca/account";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  // @ts-ignore
  account: Account;
  changeBool: boolean | undefined

  ngOnInit(): void {
  }

  constructor(private accountService: AccountService,  private router: Router) {
    accountService.getAccount().subscribe((account: Account) => {
      this.account = account
    })
  }

  change(addForm: NgForm) {
    this.accountService.changePassword(addForm.value).subscribe((change: boolean) => {
      this.changeBool = change;
      },
      error => {
        this.changeBool = false
      }

    )
  }
}
