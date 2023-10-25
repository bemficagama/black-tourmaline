import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//import {
  //FooterComponent
  //HeaderComponent,
  //SharedModule
//} from './shared';

import { AppRoutingModule } from './app-routing.module';
import { KeyModule } from './key/shared/key.module';
import { UrlModule } from './url/shared/url.module';

import { CategoryModule } from './category/shared/category.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from "./message.service";
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { HomeComponent } from './shared/home/home.component';
import { AuthenticationComponent } from './shared/authentication/authentication.component';
import { httpInterceptorProviders } from "./http-interceptors";
import { AlertModule } from './_alert';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { MessageErrorHandler } from './errorHandler';
import { HeaderComponent } from './shared/layout/header/header.component';
import { SidebarMenuComponent } from './shared/layout/sidebar-menu/sidebar-menu.component';
import { MainComponent } from './shared/layout/main/main.component';
import { MainService } from './shared/layout/main/main.service';
import { AnaliticoComponent } from './shared/analitico/analitico.component';


@NgModule({
  declarations: [
    AppComponent,
    //FooterComponent,
    //HeaderComponent,
    LoginComponent, CreateAccountComponent, HomeComponent, 
    AuthenticationComponent, NotFoundComponent, HeaderComponent, SidebarMenuComponent, MainComponent, AnaliticoComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    AppRoutingModule, AlertModule,
    KeyModule, UrlModule, CategoryModule
  ],
  providers: [MainService, MessageService, httpInterceptorProviders, { provide: ErrorHandler, 
    useClass: MessageErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
