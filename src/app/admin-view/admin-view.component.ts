import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {BackendService} from "../service/Users-backend.service";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html'
})
export class AdminViewComponent implements OnInit {

  constructor(private router: Router,  private backend: BackendService,) {
  }
  ngOnInit(): void {
  }


}
