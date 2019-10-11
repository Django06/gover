import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../_services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
  constructor( private router: Router,
    private authService: AuthentificationService){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if ( this.authService.currentUser.IsAdmin ==='1') {
        console.log(this.authService.currentUser);
        
        return true;
      }
      this.router.navigate(["/shell"]);
      return false;
  }
}
