import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject, merge, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material';
import { startWith, takeUntil, tap, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JourneeService, GlobalService } from '../api/services';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  displayedColumns: string[] = ['id', 'name', 'date', 'montant', 'motif', 'status'];
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;
  dataSource = [];
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
    this.getHistory();
    this.globalService.GetAllUser().subscribe(res => {
      this.users$ = res;
    });
  }
  getHistory() {
    merge(this.search$)
      .pipe(
        startWith([]),
        takeUntil(this.unsubscribe$),
        tap(() => {
          this.isLoading = true;
          this.error = undefined;
        }),
        switchMap(() => this.journeeService.GetAllJournee({criteria: this.criteria}) )
      )
      .subscribe((res: any) => {
        console.log(res);

        this.isLoading = false;
        this.dataSource = res.data;
      });
  }
  filter() {
    this.criteria = {
      name: this.form.controls.user.value ,
  prixMin: this.form.controls.priceMin.value ,
  prixMax: this.form.controls.priceMax.value ,
  date: this.form.controls.date.value
    };
    console.log(this.criteria);

    this.search$.next();
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {
    this.search$.complete();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
