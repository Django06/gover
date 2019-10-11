import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  username:string="mrs";
  password:string="azerty";
  isLoggedIn: BehaviorSubject<boolean>
  constructor() {
    
  }
  login(user:string,pass:string): Observable<boolean>{
    if(user===this.username&&pass===this.password){
      this.isLoggedIn = new BehaviorSubject<boolean>(true);
      return this.isLoggedIn.asObservable();
    }
    else{
      this.isLoggedIn = new BehaviorSubject<boolean>(false);
      return this.isLoggedIn.asObservable();
    }
  }
  
}
