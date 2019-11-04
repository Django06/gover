import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as appHelpers from '../core/_helpers/app.helper';

import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { Subject, merge, of } from "rxjs";
import { MatPaginator, MatSnackBar, MatDialog } from "@angular/material";
import { startWith, tap, takeUntil, switchMap, catchError } from "rxjs/operators";
import { JourneeDetailService, CaisseService } from "../api/services";
import { ModifyJourneyComponent } from './Dialogs/modify-journey/modify-journey.component';
import { ValidationService } from '../shared/services/validation.service';

@Component({
  selector: "app-journey",
  templateUrl: "./journey.component.html",
  styleUrls: ["./journey.component.scss"]
})
export class JourneyComponent implements OnInit, AfterViewInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  displayedColumns: string[] = ["id", "user","montant", "motif", "actions"];
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;
  dataSource = {data:[],count:0}
  isLoading: boolean;
  error: string;
  criteria: any = {};
  search$ = new Subject<void>();
  caisseDetails;
  form: FormGroup;
  ImagePers:string;
  
  constructor(
    fb: FormBuilder,
    public _snackBar: MatSnackBar,
    private journeyService: JourneeDetailService,
    private caisseService: CaisseService,
    private dialog: MatDialog,

  ) {
    this.form = fb.group({
      montant: ["", [Validators.required,ValidationService.NumberValidator,ValidationService.notNull]],
      motif: ["", [Validators.required ]],
      image:[""]
    });
    
  }
  ngOnInit() {
    this.getCaisse();
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
      this.journeyService.GetAllJourneeDetail(
        {
          start: this.paginator.pageIndex * this.paginator.pageSize,
          count: this.paginator.pageSize
        }
      )
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
  editJourney(row) {
    this.dialog
    .open(ModifyJourneyComponent, {
      width: "35vw",
      data:{row :row}
    })
    .afterClosed()
    .subscribe(res => {
      if (res) {
        this.search$.next();
        this.getCaisse();
      }
    });
  }
  removeJourney(journey) {
    appHelpers
    .confirmDialog(
      this.dialog,
      'Do you really want to delete this line ?',
      '',
      'Yes',
      'CANCEL'
    )
    .subscribe(value => {
      if (value) {
        this.journeyService.DeleteJourneeDetail(journey.idJourneeDetail).subscribe(res => {
          if(res){
           this.search$.next();
           this.getCaisse();
           this._snackBar.open("Journey deleted successfely", "x", {
             duration: 3000,
             panelClass: ["success-snackbar"]
           });
          }
         });
      }
    });
  }
  getCaisse(){
    this.caisseService.GetCaisseEnCours().subscribe(res => {
      if (res) {
        console.log("re",res);
        this.caisseDetails = res;
      }
    });
  }
  addJourney() {
     if (this.form.valid) {
      if(this.form.get('montant').value !=0){        
        this.journeyService
        .AddJourneeDetail({
          Prix: this.form.controls.montant.value,
          Motif: this.form.controls.motif.value,
          Image:this.ImagePers ? this.ImagePers.replace('data:image/png;base64,','') : null
        })
        .subscribe(res => {
          if (res) {
            this.getJourneys();
            this.getCaisse();
            this._snackBar.open("Journey updated successfely", "x", {
              duration: 3000,
              panelClass: ["success-snackbar"]
            });
          }
        });
      }else{
        this._snackBar.open("amount shouldn't be null", "x", {
          duration: 4000,
          panelClass: ["danger-snackbar"]
        });
      }
      }else{
        this._snackBar.open("champs required", "x", {
          duration: 3000,
          panelClass: ["danger-snackbar"]
        });
      }
  }
  getJourneys() {
    this.search$.next();
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
  ngOnDestroy(): void {
    this.search$.complete();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
