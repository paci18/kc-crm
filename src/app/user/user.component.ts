// import {Component, OnInit} from "@angular/core";
// import {User} from "./user";
// import {UserService} from "./user.service";
// @Component({
//   selector : 'app-user',
//    templateUrl : './user.component.html'
// })
// export class UserComponent implements OnInit {
//   users: User[] = [];
//   constructor(private userService: UserService) {
//   }
//
//   ngOnInit() {
//     // this.userService.getUsers().subscribe((data: User[])=> {
//     //   console.log(data);
//     //   this.users = data;
//     // })
//     this.getAllUsers().subscribe(users => {
//       this.users = users;
//     });
//   }
//
//   getAllUsers(){
//     return this.userService.getUsers();
//   }
// }
//
//
