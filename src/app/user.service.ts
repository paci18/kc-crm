import {Injectable}  from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlBackend = "http://localhost:8050/user/getUsers/";
  constructor(private http: HttpClient) {
  }
  getUsersList(): Observable<User[]>{
    return  this.http.get<User[]>(this.urlBackend);
  }
}
