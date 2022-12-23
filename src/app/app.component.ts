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




  constructor(private httpClient: HttpClient,private keycloakService: KeycloakService, private kcService : KcService) {
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


  // public getToken(): Promise<string> {
  //   return new Promise<string>((resolve, reject) => {
  //     if (this.keycloakService.getKeycloakInstance().token) {
  //       this.keycloak
  //         .updateToken(90)
  //         .then(() => this.keycloak.token ? resolve(this.keycloak.token) : reject('No token available'))
  //         .catch((error: any) => reject(error));
  //     } else {
  //       reject('Not logged in');
  //     }
  //   });
  // }


  // public clearTokens(): void {
  //   this.accessToken = undefined;
  //   this.accessTokenParsed = null;
  //   this.idToken = undefined;
  //   this.idTokenParsed = null;
  //   this.refreshToken = undefined;
  //   this.refreshTokenParsed = null;
  // }

  private getKeycloakOpenIdConfig(): Observable<any> {
    return this.httpClient.get(`${this.authUrl}/realms/${this.realm}/.well-known/openid-configuration`)
  }

}
