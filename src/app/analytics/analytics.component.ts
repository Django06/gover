import { Component, OnInit } from "@angular/core";
import { SignalRService } from './services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { ChartService } from '../api/services';

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"]
})
export class AnalyticsComponent implements OnInit {
 
  constructor(public signalRService: SignalRService,private chartService:ChartService) { }
 
  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();  
   this.chartService.Get().subscribe(res=>{
     console.log("res",res);
     
   })
   // this.startHttpRequest();
  }
 
  // private startHttpRequest = () => {
  //   this.http.get('http://192.168.1.16:3000/Chart/Get')
  //     .subscribe(res => {
  //       console.log(res);
  //     })
  // }
}