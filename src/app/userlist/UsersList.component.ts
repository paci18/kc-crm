import {Component, OnInit} from "@angular/core";
import {User} from "../user";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-userlist',
  templateUrl: 'user-list.component.html'
})

export class UsersListComponent implements OnInit {
  users : User[] = [];

  constructor(private userService : UserService, private router : Router) {}
  ngOnInit() {
    this.getUsers();
  }

  private  getUsers(){
    this.userService.getUsersList().subscribe(data => {
    this.users = data;
  });
}
}
