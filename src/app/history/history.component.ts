import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject, merge, Observable, of } from 'rxjs';
import { MatPaginator } from '@angular/material';
import { startWith, takeUntil, tap, switchMap, catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { JourneeService, GlobalService } from '../api/services';
import { ValidationService } from '../shared/services/validation.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  displayedColumns: string[] = ["id","name","date", "montant", "motif", "status"];
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;
  dataSource = { data: [], count: 0 };;
  isLoading: boolean;
  error: string;
  criteria: any = {};
  search$ = new Subject<void>();
  panelOpenState = false;
  users$: Observable<any>;
  form: FormGroup;


  constructor(fb: FormBuilder, private journeeService: JourneeService, private globalService: GlobalService) {
    this.form = fb.group({
      user: [''],
      date: [''],
      priceMin: [''],
      priceMax: ['']
    });

  }

  ngOnInit() {
    this.globalService.GetAllUser().subscribe(res=>{
      this.users$ =res;
    })
  }

  ngAfterViewInit(): void {
    merge(this.paginator.page, this.search$)
    .pipe(
      startWith([{ pageIndex: 0, pageSize: 10 }, {}]),
      takeUntil(this.unsubscribe$),
      tap(() => {
        this.isLoading = true;
        this.error = undefined;
        this.dataSource = { ...this.dataSource,data:[] };
      }),
      switchMap(() =>
      this.journeeService.GetAllJournee({
        criteria:this.criteria,

      })
          .pipe(
            catchError(err => {
              this.isLoading = false;
              this.error = err;
              return of(this.dataSource);
            })
          )
      )
    )
    .subscribe((res: any) => {
      this.isLoading = false;
      this.dataSource.data = res.data;
      this.dataSource.count = res.count;
    });
  }

  getHistory() {
   this.search$.next();
  }
  filter(){
    this.criteria ={
        name:this.form.controls.user.value ,
        prixMin: this.form.controls.priceMin.value ,
        prixMax: this.form.controls.priceMax.value ,
        date: this.form.controls.date.value
    }

    this.search$.next();
  }

  ngOnDestroy(): void {
    this.search$.complete();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
