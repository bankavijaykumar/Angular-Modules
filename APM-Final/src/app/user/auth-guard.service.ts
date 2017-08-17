import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route,
         CanActivate, CanActivateChild } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export  class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService,
                private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('In canActivate: ' + state.url);
        return this.checkLoggedIn(state.url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('In canActivateChild: ' + state.url);
        return this.checkLoggedIn(state.url);
    }

    checkLoggedIn(url: string): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        // Retain the attempted URL for redirection
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
}
