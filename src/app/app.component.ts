import {Component, OnInit} from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import Keycloak, {KeycloakProfile} from 'keycloak-js';
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {Observable} from "rxjs";
import {KcService} from "./keycloak/keycloak.service";

@Component({
   selector: 'app-root',
templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    users : User[] = [];
  public isLoggedIn = false;
  public role: boolean = false;
  public realm: string | undefined;
  public userProfile: KeycloakProfile | null = null;
  public authUrl: string | undefined;

  constructor(private httpClient: HttpClient,private keycloakService: KeycloakService) {
    this.realm = this.keycloakService.getKeycloakInstance().realm;
    this.authUrl = this.keycloakService.getKeycloakInstance().authServerUrl;
  }
  public async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    if (this.isLoggedIn) {

      this.userProfile = await this.keycloakService.loadUserProfile();
    }
  }

  public login() {
    this.keycloakService.login();
  }

  public logout() {
    this.keycloakService.logout();
  }



}
