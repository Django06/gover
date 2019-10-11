import { Component, OnInit } from '@angular/core';
import * as fromLinks from './link';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/_services/authentification.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  dashboardLink = fromLinks.DASHBOARD_LINKS;

  constructor(private router: Router, private authService: AuthentificationService) { 
    if(this.authService.currentUser.IsAdmin !="1"){
     this.dashboardLink= this.dashboardLink.filter(e =>e.isAdmin)
    }
  }

  ngOnInit() {
  }
  
}
