import { UsersService } from "./../api/services/users.service";
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild
} from "@angular/core";
import { Subject, merge, of } from "rxjs";
import { MatPaginator, MatDialog, MatSnackBar } from "@angular/material";
import { AddUserComponent } from "./dialogs/add-user/add-user.component";
import {
  catchError,
  startWith,
  takeUntil,
  tap,
  switchMap
} from "rxjs/operators";
import { AuthentificationService } from "../core/_services/authentification.service";

@Component({
  selector: "app-user-manager",
  templateUrl: "./user-manager.component.html",
  styleUrls: ["./user-manager.component.scss"]
})
export class UserManagerComponent implements OnInit, AfterViewInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  displayedColumns: string[] = ["id", "name", "login", "actions"];
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;
  dataSource = [];
  isLoading: boolean;
  error: string;
  criteria: any = {};
  search$ = new Subject<void>();
  currentUser;
  constructor(
    private dialog: MatDialog,
    private userService: UsersService,
    private AuthService: AuthentificationService,
    public _snackBar: MatSnackBar
  ) {
    this.currentUser = this.AuthService.currentUser.nameUser;
  }

  ngAfterViewInit(): void {}
  ngOnDestroy(): void {
    this.search$.complete();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    merge(this.search$)
      .pipe(
        startWith([]),
        takeUntil(this.unsubscribe$),
        tap(() => {
          this.isLoading = true;
          this.error = undefined;
        }),
        switchMap(() => this.userService.GetAllUsers())
      )
      .subscribe((res: any) => {
        this.isLoading = false;
        console.log("result", res);
        this.dataSource = res;
      });
  }
  addUser() {
    this.dialog
      .open(AddUserComponent, {
        width: "35vw"
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.search$.next();
        }
      });
  }
  editUser() {}
  removeUser(user) {
    console.log(user);
    
    this.userService.DeleteUser(user.idUser).subscribe(res => {
      this.search$.next();
      this._snackBar.open("user deleted successfely", "x", {
        duration: 3000,
        panelClass: ["success-snackbar"]
      });
    });
  }
}
