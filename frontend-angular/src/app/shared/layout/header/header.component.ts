import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "../../../account/shared/account.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged : boolean = false
  userName : string = ""

  constructor(private auth: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.isLogged = this.auth.isUserLoggedIn()
    this.userName = this.auth.getUserName()!

  }

  logout() {
    this.auth.clear();
    this.router.navigateByUrl("/login");
    this.isLogged = false
  }

}
