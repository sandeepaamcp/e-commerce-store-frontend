import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserBackendConnectionService } from '../services/user-backend-connection.service';

@Injectable()

export class AuthGuard implements CanActivate {

    auth: any = {};

    constructor(private backend: UserBackendConnectionService, private router: Router) {

    }

    canActivate() {
        // if (this.backend.isUserLoggedIn()) {
        //     // this.router.navigate(['/dashboard']);
        //     return true;
        // }
        // else {
        //     this.router.navigate(['/login']);
        // }
        // return false;
        return true;
    }
}