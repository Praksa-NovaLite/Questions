import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(sessionStorage.getItem('token')){
            req = req.clone({
                setHeaders: {Authorization : `Bearer ${sessionStorage.getItem('token')}`}
            });
        }
        return next.handle(req);
    }
}