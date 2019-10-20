import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoService } from '../api/services';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog/dialog.component';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  todo = [];
  done = [];

  name;
  animal;

  constructor(private todoService: TodoService, public dialog: MatDialog) {
    this.todoService.GetAllTodos().subscribe((res: any) =>
      res.filter(r => {
        if (r.statue === 0) {
          this.todo = [...this.todo, r];
        } else {
          this.done = [...this.done, r];
        }
      })
    );
  }

  ngOnInit() {
    console.log('todo', this.todo);
    console.log('done', this.done);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {

      this.openDialog(event.item.data);
      transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
    }
  }

  openDialog(datas: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '35vw',
      data: {item: datas}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
      console.log('The dialog was closed',  result);

    });
  }

  // ngOnInit() {
  //   this.signalRService.startConnection();
  //   this.signalRService.addTransferChartDataListener();
  //  this.chartService.Get().subscribe(res=>{
  //    console.log("res",res);

  //  })
  //  // this.startHttpRequest();
  // }

  // // private startHttpRequest = () => {
  // //   this.http.get('http://192.168.1.16:3000/Chart/Get')
  // //     .subscribe(res => {
  //       console.log(res);
  //     })
  // }
}
