import { Injectable } from '@angular/core';
import { CanActivate, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../_services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate{
  constructor( private router: Router,
    private authService: AuthentificationService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isAuthenticated) {
        this.router.navigate(['/shell']);
        return false;
      }
      return true;
  }
}
