import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TodoService } from 'src/app/api/services';

export interface DialogData {
  prix;
  idTodo;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
prix;
  addedEvent: boolean;
  constructor(private todoService: TodoService,
              public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    changeStatue() {

      confirm('are yu sure ..??');
      if (confirm) {
        this.todoService.ClouturerTodo({prix: this.prix, idTodo: this.data.idTodo}).subscribe(res => {
          console.log('send success', res);
          console.log(this.prix);

        },
        err => {}
        );
      } else {
      }


      this.dialogRef.close();
      this.addedEvent = true;

    }
    onNoClick() {
      this.dialogRef.close();
      this.addedEvent =  false; }

}
