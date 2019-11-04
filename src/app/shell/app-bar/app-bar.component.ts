import { UsersService } from 'src/app/api/services';
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
  userInfo: any;
  image: any;
  constructor(private route: Router,
    private authSer :AuthentificationService,
    private userService:UsersService
    ) { 
      this.currentUser=this.authSer.currentUser.login
      this.userService.GetUserById(this.authSer.currentUser.IdUser).subscribe((res:any)=>{
        this.image=res.image;
        })

    }

  ngOnInit() {}
  toggleSidenav() {
    this.menuButtonClicked.emit(true);
  }
  logout(){
this.authSer.logout();
  }
}
