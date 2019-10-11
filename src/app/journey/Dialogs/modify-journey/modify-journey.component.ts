import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { UsersService, JourneeDetailService } from "src/app/api/services";

@Component({
  selector: "app-modify-journey",
  templateUrl: "./modify-journey.component.html",
  styleUrls: ["./modify-journey.component.scss"]
})
export class ModifyJourneyComponent implements OnInit {
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ModifyJourneyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder,
    public _snackBar: MatSnackBar,
    private journeyDetails: JourneeDetailService
  ) {
    this.form = fb.group({
      montant: [this.data.row.prix, [Validators.required]],
      motif: [this.data.row.motif, [Validators.required]]
    });
  }

  ngOnInit() {
    console.log("data", this.data.row);
  }
  addJourney() {
    if (this.form.value) {
      this.journeyDetails
        .UpdateJourneeDetail({
          codeJourneeDetail: this.data.row.idJourneeDetail,
          Prix: this.form.controls.montant.value,
          Motif:this.form.controls.motif.value,
        })
        .subscribe(res => {
          this.dialogRef.close(this.form.value);
          this._snackBar.open("Journey updated successfely", "x", {
            duration: 3000,
            panelClass: ["success-snackbar"]
          });
        });
    }
  }
}
