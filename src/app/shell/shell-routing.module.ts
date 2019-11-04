import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ShellComponent } from "./shell.component";
import { AdminGuard } from "../core/_guards/admin.guard";

const routes: Routes = [
  {
    path: "",
    component: ShellComponent,
    children: [
      { path: "", redirectTo: "dashboard" },
      { path: "dashboard", component: DashboardComponent },
      {
        path: "journey",
        loadChildren: () =>
          import("../journey/journey.module").then(m => m.JourneyModule)
      },
      {
        path: "history",
        loadChildren: () =>
          import("../history/history.module").then(m => m.HistoryModule)
      },
      {
        path: "analytics",
        loadChildren: () =>
          import("../analytics/analytics.module").then(m => m.AnalyticsModule)
      },
      {
        path: "userManager",
        loadChildren: () =>
          import("../user-manager/user-manager.module").then(
            m => m.UserManagerModule
          ),
        canLoad: [AdminGuard]
      },
      {
        path: "caisse",
        loadChildren: () =>
          import("../caisse-manager/caisse-manager.module").then(
            m => m.CaisseManagerModule
          ),
        canLoad: [AdminGuard]
      },
      {
        path: "payment",
        loadChildren: () =>
          import("../payment/payment.module").then(
            m => m.PaymentModule
          ),
        canLoad: [AdminGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule {}
