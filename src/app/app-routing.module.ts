import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {AccessDeniedComponent} from "./access-denied/access-denied.component";
import {ListUsersComponent} from "./user/listUsersComponent";



const routes: Routes = [
  {
        path: 'users',
        component: ListUsersComponent,
        data: {
          roles: ['administrator']
        },
        canActivate: [AuthGuard]
      },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
    canActivate: [AuthGuard]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
