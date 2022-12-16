import {Injectable}  from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlBackend = "http://localhost:8040/user/getUsers";
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.urlBackend);
  }
}
