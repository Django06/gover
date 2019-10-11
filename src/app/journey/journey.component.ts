import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "../api/services/users.service";
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { Subject, merge } from "rxjs";
import { MatPaginator, MatSnackBar, MatDialog } from "@angular/material";
import { startWith, tap, takeUntil, switchMap } from "rxjs/operators";
import { JourneeDetailService, CaisseService } from "../api/services";
import { ModifyJourneyComponent } from './Dialogs/modify-journey/modify-journey.component';

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
  dataSource = [];
  isLoading: boolean;
  error: string;
  criteria: any = {};
  search$ = new Subject<void>();
  caisseDetails;
  form: FormGroup;
  
   numericNumberReg= '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  constructor(
    fb: FormBuilder,
    public _snackBar: MatSnackBar,
    private journeyService: JourneeDetailService,
    private caisseService: CaisseService,
    private dialog: MatDialog,

  ) {
    this.form = fb.group({
      montant: ["", [Validators.required,Validators.pattern(this.numericNumberReg)]],
      motif: ["", [Validators.required]]
    });
    
  }

  ngOnInit() {
    this.getCaisse();
    this.getJourneys();
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
getCaisse(){
  this.caisseService.GetCaisseEnCours().subscribe(res => {
    if (res) {
      console.log(res);
      this.caisseDetails = res;
    }
  });
}
  addJourney() {
     console.log(this.form.value);
     if (this.form.valid) {
      console.log(this.form.value);
      this.journeyService
        .AddJourneeDetail({
          Prix: this.form.controls.montant.value,
          Motif: this.form.controls.motif.value,
        })
        .subscribe(res => {
          if (res) {
            this.getJourneys();
            this.getCaisse();
            this._snackBar.open("Journey added successfely", "x", {
              duration: 3000,
              panelClass: ["success-snackbar"]
            });
          }
        });
      }else{
        this._snackBar.open("champs required", "x", {
          duration: 3000,
          panelClass: ["danger-snackbar"]
        });
      }
  }
  

  getJourneys() {
    merge(this.search$)
      .pipe(
        startWith([]),
        takeUntil(this.unsubscribe$),
        tap(() => {
          this.isLoading = true;
          this.error = undefined;
        }),
        switchMap(() => this.journeyService.GetAllJourneeDetail())
      )
      .subscribe((res: any) => {
        this.isLoading = false;
        this.dataSource = res;
      });
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {
    this.search$.complete();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
