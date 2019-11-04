import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSidenav } from '@angular/material';
import { AddCaisseComponent } from '../add-caisse/add-caisse.component';
import { GlobalService, CaisseService } from 'src/app/api/services';

@Component({
  selector: 'app-modify-caisse',
  templateUrl: './modify-caisse.component.html',
  styleUrls: ['./modify-caisse.component.scss']
})
export class ModifyCaisseComponent implements OnInit {
  form: FormGroup;
  formCloture: FormGroup;
  status;
@ViewChild('regSnav', { static: true })
regSnav: MatSidenav;
  constructor(
    public dialogRef: MatDialogRef<AddCaisseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private caisseService: CaisseService,
    fb: FormBuilder,
    public _snackBar: MatSnackBar
  ) {
    this.status = "En cours"
    this.form = fb.group({
      prixUnit: [this.data.data.prixUnit,[Validators.required]],
      mois: [this.data.data.mois,[Validators.required]]
    });
    this.formCloture = fb.group({
      prix: [this.data.data.prixUnit,[Validators.required]],
    });
   
  }

  ngOnInit() {}
  modifyCaisse() {
    if (this.form.value) {
      this.caisseService
        .AddCaisse(this.form.value)
        .subscribe(res => {
              this.dialogRef.close(this.form.value);
              this._snackBar.open("Caisse added successfely", "x", {
                duration: 3000,
                panelClass: ["success-snackbar"]
              });
        });
    }
  }
  cloturerCaisse() {
    if (this.formCloture.value) {
      this.caisseService.CloturerLaCaisse(this.formCloture.controls.prix.value).subscribe(res=>{
        this.dialogRef.close();
        this._snackBar.open("Caisse closed successfely", "x", {
          duration: 3000,
          panelClass: ["success-snackbar"]
        });
      },
      err=>{
        this._snackBar.open("Error when closing the caisse", "x", {
          duration: 3000,
          panelClass: ["danger-snackbar"]
        });
      })
      
    }
  }
  
}
