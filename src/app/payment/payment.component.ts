import { JourneeDetailService, CaisseService } from "src/app/api/services";
import { Component, OnInit } from "@angular/core";
import { UsersService } from "../api/services";
import { SelectionModel } from "@angular/cdk/collections";
import { MatSnackBar, MatDialog } from '@angular/material';
import * as appHelpers from '../core/_helpers/app.helper';

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"]
})
export class PaymentComponent implements OnInit {
  users: any = [];
  dataSource: any = [];
  displayedColumns: string[] = [
    "select",
    "name",
    "date",
    "montant",
    "motif",
    "status"
  ];
  initialSelection = [];
  selection = new SelectionModel<any>(true, this.initialSelection);
  caisseInfo:any = [];
  isSelected = false;
  total = 0;
  listIdJournee:any = [];
  currentSelectedUser :any;
  error:string;
  isLoading:boolean=false;


  constructor(
    private usersService: UsersService,
    private journeeDetail: JourneeDetailService,
    private caisse: CaisseService,
    public _snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) {}

  ngOnInit() {
    this.getUsers();
    this.caisse.GetCaisseEnCours().subscribe(res => {
      this.caisseInfo = res;
    })
  }
  getUsers(){
    this.usersService.GetAllUsers().subscribe((res:any) => {
      this.users = res.map(m => ({...m,stat:false})); 
    });
  }
  getUserSelected(user){
  this.currentSelectedUser=user;
  this.getJourneeDetail();
  this.selection.clear();

  }
  getJourneeDetail() {
    this.isSelected = true;
    this.isLoading=true;
    this.journeeDetail
      .GetJourneeDetailsImpaye({ idUser: this.currentSelectedUser.idUser })
      .subscribe((res: any) => {
        this.dataSource = res.data;
        this.isLoading=false;
      });
      this.users.map(e=> {
        if(e.idUser!=this.currentSelectedUser.idUser){
          e.stat=false;
                }
        else{
          e.stat=true;
        }
      })
  }
  sendValidation(){

    appHelpers
    .confirmDialog(
      this.dialog,
      'please confime this payment',
      '',
      'Yes',
      'CANCEL'
    )
    .subscribe(value => {
      if (value) {
        this.listIdJournee = this.selection.selected.map(m =>m.idJourneeDetail);
        this.journeeDetail.ChangeStatueJourneeDetail(this.listIdJournee).subscribe(res => {
        if(res){
          this._snackBar.open("Paid successfely", "x", {
            duration: 3000,
            panelClass: ["success-snackbar"]}); 
            this.usersService.GetAllUsers().subscribe((res:any) => {
              this.users = res.map(m => ({...m,stat:false})); 
              this.getUserSelected(this.currentSelectedUser);
        
            });
      }
    });    
    }  
},
err=>{
  this.error=err;
  this._snackBar.open("Erreur", "x", {
    duration: 3000,
    panelClass: ["danger-snackbar"]
  });
});
}



   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    this.total = this.selection.selected.map(m => m.prix).reduce((a, b) => a + b, 0);
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}


