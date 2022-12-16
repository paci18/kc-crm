import {Component, OnInit, ViewChild} from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { BackendService} from "./service/Users-backend.service";
import {Router} from "@angular/router";
import {AdminViewComponent} from "./admin-view/admin-view.component";
import {HttpClient} from "@angular/common/http";
import * as http from "http";
;



@Component({
   selector: 'app-root',
templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  users = {};
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'username'];
  public isLoggedIn = false;
  public role: boolean = false;
  public  token : any;
  public userProfile: KeycloakProfile | null = null;
  public isTokenExpired = true;

  constructor(
    private readonly keycloak: KeycloakService,
    private http: HttpClient
  ) {

  }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();


    if (this.isLoggedIn) {
      this.isTokenExpired = this.keycloak.isTokenExpired();
      this.token = await this.keycloak.getToken();
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }



public listUser(){
    this.http.get('/getUsers').subscribe(data => this.users = data);
}

}
