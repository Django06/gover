import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Observable } from "rxjs";
import { GlobalService, CaisseService } from "src/app/api/services";

@Component({
  selector: "app-add-caisse",
  templateUrl: "./add-caisse.component.html"
})
export class AddCaisseComponent implements OnInit {
  form: FormGroup;
  mois$: Observable<any>;
  constructor(
    public dialogRef: MatDialogRef<AddCaisseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private globalService: GlobalService,
    private caisseService: CaisseService,
    fb: FormBuilder,
    public _snackBar: MatSnackBar
  ) {
    this.form = fb.group({
      montant: ["",[Validators.required]],
      mois: ["",[Validators.required]]
    });
    this.globalService.GetMois().subscribe(res => {
      this.mois$ = res;
    });
  }

  ngOnInit() {}
  addCaisse() {
    if (this.form.value) {
      console.log(this.form.value);
      this.caisseService
        .AddCaisse(this.form.value)
        .subscribe(res => {
              this.dialogRef.close(this.form.value);
              this._snackBar.open("caisse added successfely", "x", {
                duration: 3000,
                panelClass: ["success-snackbar"]
              });

        });
    }
  }
}
