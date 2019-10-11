import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../_services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild, CanLoad {
  constructor( private router: Router,
    private authService: AuthentificationService){}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isAuthenticated && this.authService.currentUser) {
        // logged in so return true
        return true;
      }
      // not logged in so redirect to login page.
      this.router.navigate(["/login"]);
      return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      if (this.authService.isAuthenticated && this.authService.currentUser) {
        // logged in so return true
        return true;
      }
      // not logged in so redirect to login page.
      this.router.navigate(["/login"]);
      return false;
  }
}
