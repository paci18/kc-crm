import {Component, OnInit} from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile} from 'keycloak-js';
import {HttpClient} from "@angular/common/http";
import {User} from "./user/user";
import { Router} from "@angular/router";
import {UserService} from "./user/user.service";




@Component({
   selector: 'app-root',
templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

   users : User[] = [];
 // displayedColumns: string[] = ['firstname', 'lastname', 'email', 'username'];
  public isLoggedIn = false;
  public role: boolean = false;

  public userProfile: KeycloakProfile | null = null;
  public isTokenExpired = true;

  constructor(
    private readonly keycloak: KeycloakService,
    private http: HttpClient,
    private router: Router,
    private userService : UserService
  ) {

  }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();


    if (this.isLoggedIn) {
      this.isTokenExpired = this.keycloak.isTokenExpired();
    //  this.token = await this.keycloak.getToken();
      this.userProfile = await this.keycloak.loadUserProfile();

    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }


  public getToken(): Promise<string>
  {
    return this.keycloak.getToken()
  }

//
 public getUsers(){
//
   this.userService.getUsers().subscribe(data => {
    this.users = data;
     })
 }

}
