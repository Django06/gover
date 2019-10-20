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
import * as appHelpers from '../core/_helpers/app.helper';
import { UpdateUserComponent } from './dialogs/update-user/update-user.component';


@Component({
  selector: "app-user-manager",
  templateUrl: "./user-manager.component.html",
  styleUrls: ["./user-manager.component.scss"]
})
export class UserManagerComponent implements OnInit, AfterViewInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  displayedColumns: string[] = [ 'imgBytes', "name", "login", "actions"];
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;
  dataSource = [];
  isLoading: boolean;
  error: string;
  criteria: any = {};
  search$ = new Subject<void>();
  currentUser;
  image: any;
  constructor(
    private dialog: MatDialog,
    private userService: UsersService,
    private AuthService: AuthentificationService,
    public _snackBar: MatSnackBar
  ) {
    this.currentUser = this.AuthService.currentUser.nameUser;
    this.userService.GetUserById(this.AuthService.currentUser.IdUser).subscribe((res:any)=>{
      this.image=res.image;
      })
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
  editUser(user) {
    this.dialog
      .open(UpdateUserComponent, {
        width: "35vw",
        data:{user:user}
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.search$.next();
        }
      });
  }
  removeUser(user) {
    appHelpers
    .confirmDialog(
      this.dialog,
      'Do you really want to delete this user ?',
      '',
      'Yes',
      'CANCEL'
    )
    .subscribe(value => {
      if (value) {
        this.userService.DeleteUser(user.idUser).subscribe(res => {
          this.search$.next();
          this._snackBar.open("user deleted successfely", "x", {
            duration: 3000,
            panelClass: ["success-snackbar"]
          });
        });
      }
    });
  }
}
