import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { Subject, merge, Observable, of } from "rxjs";
import { MatPaginator, MatDialog } from "@angular/material";
import {
  startWith,
  takeUntil,
  tap,
  switchMap,
  catchError
} from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JourneeService, GlobalService } from "../api/services";
import { ValidationService } from "../shared/services/validation.service";
import { FilterHistoryComponent } from "./filter-history/filter-history.component";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"]
})
export class HistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  displayedColumns: string[] = [
    "id",
    "name",
    "date",
    "montant",
    "motif",
    "status"
  ];
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;
  dataSource = { data: [], count: 0 };
  isLoading: boolean;
  error: string;
  criteria: any = {};
  search$ = new Subject<void>();
  panelOpenState = false;
  users$: Observable<any>;
  form: FormGroup;
  get criteriaToShow() {
    return {
      ...this.criteria
    };
  }

  constructor(
    fb: FormBuilder,
    private JourneeService: JourneeService,
    private globalService: GlobalService,
    private dialog: MatDialog
  ) {
    this.form = fb.group({
      name: [""],
      date: [""],
      prixMin: [""],
      prixMax: [""]
    });
  }

  ngOnInit() {
    this.globalService.GetAllUser().subscribe(res => {
      this.users$ = res;
    });
  }

  ngAfterViewInit(): void {
    merge(this.paginator.page, this.search$)
      .pipe(
        startWith([{ pageIndex: 0, pageSize: 10 }, {}]),
        takeUntil(this.unsubscribe$),
        tap(() => {
          this.isLoading = true;
          this.error = undefined;
          this.dataSource = { ...this.dataSource, data: [] };
        }),
        switchMap(() =>
          this.JourneeService.GetAllJournee({
            start: this.paginator.pageIndex * this.paginator.pageSize,
            count: this.paginator.pageSize,
            criteria: this.criteria
          }).pipe(
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
  removeFilterValue(key: string) {
    this.criteria[key] = undefined;
    this.search$.next();
    this.form.get(key).reset();
  }
  getHistory() {
    this.search$.next();
  }
  filter() {
    this.criteria = {
      name: this.form.controls.name.value,
      prixMin: this.form.controls.prixMin.value,
      prixMax: this.form.controls.prixMax.value,
      date: this.form.controls.date.value
    };
    this.search$.next();
  }
  searchDialog() {
    this.dialog
      .open(FilterHistoryComponent, {
        data: {
          avecNomenclature: true
        }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.criteria = res;
          this.search$.next();
        }
      });
  }
  ngOnDestroy(): void {
    this.search$.complete();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
