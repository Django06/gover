import { JourneeDetailService, CaisseService } from "src/app/api/services";
import { Component, OnInit } from "@angular/core";
import { UsersService } from "../api/services";
import { SelectionModel } from "@angular/cdk/collections";

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
  selection = new SelectionModel<any>(true, []);
  caisseInfo:any = [];
  isSelected = false;
  total = 0;
  listIdJournee:any = [];

  constructor(
    private usersService: UsersService,
    private journeeDetail: JourneeDetailService,
    private caisse: CaisseService
  ) {}

  ngOnInit() {
    this.usersService.GetAllUsers().subscribe((res:any) => {

      this.users = res.map(m => ({...m,stat:false})); 
      console.log("users", res);
      console.log("users2", this.users);
    });

    this.caisse.GetCaisseEnCours().subscribe(res => {
      this.caisseInfo = res;
      console.log("caisseInfo",res);

    })
  }

  getJourneeDetail(user) {
    console.log("user", user);
    this.isSelected = true;
    this.journeeDetail
      .GetJourneeDetailsImpaye({ idUser: user.idUser })
      .subscribe((res: any) => {
        this.dataSource = res.data;
        console.log("click journee", res.data);
      });
      this.users.map(e=> {
        if(e.idUser!=user.idUser){
          e.stat=false;
        }
        else{
          e.stat=true;
        }
      })
      console.log("testos",this.users);
      
      // this.users.stat = false;
      // user.stat = true;
      console.log("stat", user);
      
  }
  sendValidation(){
    this.listIdJournee = this.selection.selected.map(m =>m.idJourneeDetail);
this.journeeDetail.ChangeStatueJourneeDetail(this.listIdJournee).subscribe(res => {
  res => console.log("apre pay ", res);
  
});
console.log("log3", this.listIdJournee);

  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
   
    
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }    
    this.total = this.selection.selected.map(m => m.prix).reduce((a, b) => a + b, 0);

    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.position + 1}`;

  }
}
