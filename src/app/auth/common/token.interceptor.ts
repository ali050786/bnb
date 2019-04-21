import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthServices } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthServices) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getAuthToken();

    if (token){
        console.log(token)
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token // GET TOKEN HERE
        
      }
     });
    }

    return next.handle(request);
  }
}
