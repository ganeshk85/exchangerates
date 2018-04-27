import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { ExchangerateComponent } from './components/exchangerate/exchangerate.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddExchangeRateComponent } from './components/add-exchange-rate/add-exchange-rate.component';
import { ExchangerateListComponent } from './components/exchangerate-list/exchangerate-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ExchangerateService } from './services/exchangerate.service';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';


const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'exchangerate', component: ExchangerateComponent, canActivate:[AuthGuard]},
  //{path:"**", component: PageNotFoundComponent}, //Wildcard Route - Always should be at the end
]


@NgModule({
  declarations: [
    AppComponent,
    ExchangerateComponent,
    HomeComponent,
    NavbarComponent,
    AddExchangeRateComponent,
    ExchangerateListComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    ExchangerateService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
