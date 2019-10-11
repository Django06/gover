import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/_services/authentification.service';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  currentUser:any;
  @Output()
  menuButtonClicked = new EventEmitter();
  constructor(private route: Router,
    private authSer :AuthentificationService) { 

    }

  ngOnInit() {
    this.currentUser=this.authSer.currentUser.login
    console.log("user",this.authSer.currentUser.login);
    
  }
  toggleSidenav() {
    this.menuButtonClicked.emit(true);
  }
  logout(){
this.authSer.logout();
  }
}
