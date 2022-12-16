import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {AccessDeniedComponent} from "./access-denied/access-denied.component";
import {AdminViewComponent} from "./admin-view/admin-view.component";
import {BackendService} from "./service/Users-backend.service";


const routes: Routes = [
  {
        path: 'admin',
        component: BackendService,
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
