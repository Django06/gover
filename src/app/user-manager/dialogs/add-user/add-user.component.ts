import { UsersService } from "./../../../api/services/users.service";
import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit {
  form: FormGroup;
  ImagePers:string;
  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder,
    private usersService: UsersService,
    public _snackBar: MatSnackBar
  ) {
    this.form = fb.group({
      name: ["",[Validators.required]],
      login: ["",[Validators.required]],
      pass: ["",[Validators.required]]
    });
  }

  ngOnInit() {}
  addUser() {
    if (this.form.value) {
      this.usersService
        .AddUser({
          Login: this.form.get("login").value,
          Pass: this.form.get("pass").value,
          Name: this.form.get("name").value
        })
        .subscribe(res => {
          this.dialogRef.close(this.form.value);
          this._snackBar.open("user added successfely", "x", {
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
