/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { AUTHService } from './services/auth.service';
import { CaisseService } from './services/caisse.service';
import { ChartService } from './services/chart.service';
import { GlobalService } from './services/global.service';
import { JourneeService } from './services/journee.service';
import { JourneeDetailService } from './services/journee-detail.service';
import { TodoService } from './services/todo.service';
import { UsersService } from './services/users.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    AUTHService,
    CaisseService,
    ChartService,
    GlobalService,
    JourneeService,
    JourneeDetailService,
    TodoService,
    UsersService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
