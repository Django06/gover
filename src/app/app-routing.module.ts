import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './core/_guards/login.guard';
import { AuthGuard } from './core/_guards/auth.guard';

const routes: Routes = [
  {
    path:"",
    component:LoginComponent,
    canActivate: [LoginGuard]
    
  },{
    path: "shell",
    loadChildren: () => import("./shell/shell.module").then(m => m.ShellModule),
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
//   {
//     path:"login",
//     component:LoginComponent,
// canActivate: [LoginGuard]
//   },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
