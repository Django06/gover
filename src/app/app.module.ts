import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from './api/api.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/_interceptor/interceptor';
import { ChartsModule } from 'ng2-charts';





export function tokenGetter() {
  return localStorage.getItem(name);
}
const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter
  }
};
@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    // shared modules
    SharedModule,
    CoreModule,
    HttpClientModule,
    CoreModule,
    ChartsModule,
     // JwtHelper
     JwtModule.forRoot(JWT_Module_Options),
     // api
     ApiModule.forRoot({ rootUrl: 'http://localhost:3000' }),
  ],
  exports: [SharedModule, FormsModule, ReactiveFormsModule],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
