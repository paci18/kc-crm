import {Injectable} from "@angular/core";
import {HttpHandler,HttpEvent, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {Observable} from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor
{
  constructor(private kcService: KeycloakService,  private tokenExtractor: HttpXsrfTokenExtractor) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.kcService.getToken() || "";
    const token = this.tokenExtractor.getToken() as string;
    request = request.clone({
      setHeaders: {
        "Authorization": "Bearer " + authToken
      }
    });
    return next.handle(request);
  }
}
