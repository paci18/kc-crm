import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "./user";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
@Component({
  selector : 'app-user',
  templateUrl: 'user.component.html'
})
export class ListUsersComponent implements OnInit{
   users : Observable<User[]> | undefined;
   constructor(private userService : UserService) {
   }
   ngOnInit() {
     this.realodData();
   }


   realodData() {
    this.users = this.userService.getUsers();
  }
}
