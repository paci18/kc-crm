import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {UserListComponent} from "./userlist/user-list.component";
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        realm: 'Keycloak-angular-connection',
        url: 'http://keycloak:8080',
        clientId: 'kc-crm',
      },
      initOptions: {
        //onLoad: 'check-sso',
        // checkLoginIframe: true,
       onLoad: 'login-required',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
    });
}
@NgModule({
  declarations: [AppComponent, UserListComponent],
  imports: [AppRoutingModule, BrowserModule, KeycloakAngularModule, FormsModule, BrowserAnimationsModule, HttpClientModule, BrowserAnimationsModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ], bootstrap: [AppComponent]
})
export class AppModule {}
