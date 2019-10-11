import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AddCaisseComponent } from "./dialogs/add-caisse/add-caisse.component";
import { CaisseService } from "../api/services";
import { ModifyCaisseComponent } from './dialogs/modify-caisse/modify-caisse.component';

@Component({
  selector: "app-caisse-manager",
  templateUrl: "./caisse-manager.component.html",
  styleUrls: ["./caisse-manager.component.scss"]
})
export class CaisseManagerComponent implements OnInit {
  caises;
  constructor(private dialog: MatDialog, private caisseService: CaisseService,
    ) {
this.getAllcaisse();
  }
getAllcaisse(){
    this.caisseService.GetAllCaisse().subscribe(res => {
      this.caises = res;
      console.log(res);
    });
}
  ngOnInit() {}
  addCaisse() {
    this.dialog
      .open(AddCaisseComponent, {
        width: "35vw"
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.getAllcaisse()
        }
      });
  }
  modifyCaisse(caiss) {
    console.log(caiss);
    
    this.dialog
      .open(ModifyCaisseComponent, {
        width: "40vw",
        data: {data:caiss}
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.getAllcaisse()
        }
      });
  }
}
