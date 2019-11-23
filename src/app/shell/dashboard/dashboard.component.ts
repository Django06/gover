import { CaisseService, ChartService } from 'src/app/api/services';
import { UsersService } from 'src/app/api/services';
import { User } from './../../core/_services/user';
import { AuthentificationService } from './../../core/_services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: [],
    },
  ];
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  userToken: User ;
  user : any;
  caisse;

  constructor(
    private router: Router,
    private _userToken: AuthentificationService,
    private _user :UsersService,
    private _caisse:CaisseService,
    private _chart:ChartService
    ) {

      _caisse.GetCaisseEnCours().subscribe(res => {
      this.caisse = res;

      _chart.Get().subscribe((res:any) => {
        this.pieChartLabels = res.names;
        this.pieChartData = res.static;
        for (let index = 0; index < this.pieChartData.length; index++) {
          this.pieChartColors[0].backgroundColor.push(this.getRandomColor());
        }


        console.log('res', res);

      })
      })
    this.userToken = this._userToken.currentUser;
    _user.GetUserById(this.userToken.IdUser).subscribe( (res:any) =>
{
  this.user = res;
  console.log('res',res);

},
err =>{
  console.log('err',err);
}
    )

    console.log('hghjgj', this.userToken);
    console.log('from api user', this.user);


  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  ngOnInit() {

  }
  goToJourney(){
    console.log('clicked');
    this.router.navigate(['/shell/journey']);
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}
