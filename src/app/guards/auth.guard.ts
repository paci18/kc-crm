// // import { Injectable } from '@angular/core';
// // import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// // import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
// // import {KeycloakConfig} from "keycloak-js";
// //
// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthGuard extends KeycloakAuthGuard {
// //   isAuthEnable: boolean ) true;
// // requiredUserRole: string;
// //
// //   constructor(
// //     protected override readonly router: Router,
// //     protected readonly keycloak: KeycloakService,
// //     private  keycloakConfigService : KeycloakConfig
// //   ) {
// //     super(router, keycloak);
// //   }
// //
// //   async isAccessAllowed(
// //     route: ActivatedRouteSnapshot,
// //     state: RouterStateSnapshot): Promise<boolean | UrlTree> {
// //
// //     if (!this.authenticated) {
// //       await this.keycloak.login({
// //         redirectUri: window.location.origin + state.url,
// //       });
// //     }
// //
// //     return this.authenticated;
// //   }
// // }
// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
// import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
//
// @Injectable()
// export class AuthGuard extends KeycloakAuthGuard {
//
//   constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
//     super(router, keycloakAngular);
//   }
//
//
//   public async isAccessAllowed(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Promise<boolean | UrlTree> {
//
//     // Force the user to log in if currently unauthenticated.
//     if (!this.authenticated) {
//       await this.keycloakAngular.login({
//         redirectUri: window.location.origin + state.url,
//       });
//     }
//
//     // Get the roles required from the route.
//     const requiredRoles = route.data.roles;
//
//     // Allow the user to to proceed if no additional roles are required to access the route.
//     if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
//       return true;
//     }
//
//     // Allow the user to proceed if all the required roles are present.
//     return requiredRoles.every((role) => this.roles.includes(role));
//   }
//
// }
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable()
export class AuthGuard extends KeycloakAuthGuard {

  constructor(protected override router: Router,
              protected override keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }


  public async isAccessAllowed(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloakAngular.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    return requiredRoles.every((role) => this.roles.includes(role));
  }

}
