import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";
import { AUTHService } from 'src/app/api/services';
import { User } from './user';

export const AUTH_TOKEN_KEY = "UAT";
@Injectable({
  providedIn: "root"
})
export class AuthentificationService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  private _currentUser: User;

  public get isAuthenticated(): boolean {
    return this._isAuthenticated.getValue();
  }

  public get isAuthenticatedChange(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  public setIsAuthenticated(v: boolean) {
    this._isAuthenticated.next(v);
  }

  public get currentUser(): User {
    return this._currentUser;
  }
  constructor(
    private jwtHelperService: JwtHelperService,
    private authService: AUTHService
  ) {
    const user = this.getDecodedTokenFromStorage();
    if (user) {
      this._currentUser = user;
      this.setIsAuthenticated(true);
    }
  }

  login(logging: string, password: string): Observable<any> {
    return this.authService.Authentification({ login:logging,pass:password })
      .pipe(
        map((token: any) => {
          localStorage.setItem(AUTH_TOKEN_KEY, token);
          const currentUser: any = this.getDecodedTokenFromStorage();
          if (currentUser) {
            this._currentUser = currentUser;
            this.setIsAuthenticated(true);
          }
          return currentUser;
        })
      );
  }

  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setTimeout(() => location.reload(), 250);
  }

  getDecodedTokenFromStorage(): any | null {
    let decodedToken: any;
    try {
      decodedToken = this.jwtHelperService.decodeToken(
        localStorage.getItem(AUTH_TOKEN_KEY)
      );
      return decodedToken;
      // valid token format
    } catch (error) {
      // invalid token format
      return null;
    }
  }
}
