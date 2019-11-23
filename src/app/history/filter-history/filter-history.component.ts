import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/api/services';

@Component({
  selector: 'app-filter-history',
  templateUrl: './filter-history.component.html',
  styleUrls: ['./filter-history.component.scss']
})
export class FilterHistoryComponent implements OnInit {
  form: FormGroup;
  users$: Observable<any>;
  constructor(
    public dialogRef: MatDialogRef<FilterHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder,
    private globalService: GlobalService
  ) {
    this.form = fb.group({
      name: [],
      date: [''],
      prixMin: [''],
      prixMax: ['']
    });
  }

  ngOnInit() {
    this.globalService.GetAllUser().subscribe(res=>{
      this.users$ =res;
    })
  }

  search() {
    if (this.form.value) {
      this.dialogRef.close(this.form.value);
    }
  }
}
