import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ExchangerateComponent } from './components/exchangerate/exchangerate.component';
import { ExchangerateService } from './services/exchangerate.service';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'exchangerate', component: ExchangerateComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ExchangerateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ExchangerateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
