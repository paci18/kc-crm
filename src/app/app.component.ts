import {Component, OnInit} from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import Keycloak, {KeycloakProfile} from 'keycloak-js';
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {Observable} from "rxjs";


@Component({
   selector: 'app-root',
templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    users : User[] = [];
  public isLoggedIn = false;
  public role: boolean = false;
  public accessToken : String | undefined;
  public realm: string | undefined;
  public  response: any;
  public userProfile: KeycloakProfile | null = null;
  public openIdConfig: any;
  public authUrl: string | undefined;
  public accessTokenParsed: any;
  public token : string = "";
  public idToken: string | undefined;
  public idTokenParsed: any;

  public refreshToken: string | undefined;
  public refreshTokenParsed: any;

  constructor(private httpClient: HttpClient,private readonly keycloakService: KeycloakService,   private  keycloak : Keycloak) {

  }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();


    if (this.isLoggedIn) {

      this.userProfile = await this.keycloak.loadUserProfile();


    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }


  public getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.keycloak.token) {
        this.keycloak
          .updateToken(90)
          .then(() => this.keycloak.token ? resolve(this.keycloak.token) : reject('No token available'))
          .catch((error: any) => reject(error));
      } else {
        reject('Not logged in');
      }
    });
  }


  public clearTokens(): void {
    this.accessToken = undefined;
    this.accessTokenParsed = null;
    this.idToken = undefined;
    this.idTokenParsed = null;
    this.refreshToken = undefined;
    this.refreshTokenParsed = null;
  }

  private getKeycloakOpenIdConfig(): Observable<any> {
    return this.httpClient.get(`${this.authUrl}/realms/${this.realm}/.well-known/openid-configuration`)
  }

}
