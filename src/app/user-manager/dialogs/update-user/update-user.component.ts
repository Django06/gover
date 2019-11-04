import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UsersService } from 'src/app/api/services';
import { objectNullValueSanitizer } from 'src/app/core/_helpers/utils';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  form: FormGroup;
  ImagePers:string;
  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder,
    private usersService: UsersService,
    public _snackBar: MatSnackBar
  ) {
    this.form = fb.group({
      name: [this.data.user.login,[Validators.required]],
      pass: ["",[Validators.required]]
    });
  }

  ngOnInit() {}
  updateUser() {

    if (this.form.value) {
      const objToSend = {
        name: this.form.controls.name.value,
        pass:  this.form.controls.pass.value,
        image: this.ImagePers.replace('data:image/png;base64,','')
    }
      console.log(this.data.user.idUser);
      
      this.usersService
        .UpdateUser({
          idUser:this.data.user.idUser,
          users:objectNullValueSanitizer(objToSend)
        })
        .subscribe(res => {
          this.dialogRef.close(this.form.value);
          this._snackBar.open("user updated successfely", "x", {
            duration: 3000,
            panelClass: ["success-snackbar"]
          });
        });
    }
  }
  ChargerPhoto(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    var reader = e.target;
    this.ImagePers = reader.result;
    
    
  }
}
