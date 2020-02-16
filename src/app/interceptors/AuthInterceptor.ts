import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from '../../environments/environment';
import { UserBackendConnectionService } from '../services/user-backend-connection.service';

@Injectable()
export class AuthInterceptor {}
// implements HttpInterceptor {

//     constructor(private ser:UserBackendConnectionService){};
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
//         const token = this.ser.getUserToken();
//         console.log(token);

//         if (!token) {
//             return next.handle(req);
//         }

//         const req1 = req.clone({
//             setHeaders: { 
//                 Authorization: `Bearer ${token}`
//             }
//         });

//         return next.handle(req1);
//     }

// }