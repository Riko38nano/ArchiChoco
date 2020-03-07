import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthComponent } from './compte/auth/auth.component';
import { InscriptionComponent } from './compte/inscription/inscription.component';

import { ToolBarComponent } from './tool-bar/tool-bar.component';

import { ArticleListComponent } from './article/article-list/article-list.component';

import { CartComponent } from './article/cart/cart.component';
import { mdpMatchValidatorDirective } from './compte/inscription/mdpMatchValidator';

import {ErrorInterceptor} from './compte/auth/service/error.interceptor';
import {JwtInterceptor} from './compte/auth/service/jwt.interceptor';
import { CommandeListComponent } from './commande/commande-list/commande-list.component';
import { ComptaComponent } from './compta/compta.component';
import { BoiteComponent } from './article/boite/boite.component';

import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    InscriptionComponent,
    ArticleListComponent,
    ToolBarComponent,
    CartComponent,
    mdpMatchValidatorDirective,
    CommandeListComponent,
    ComptaComponent,
    BoiteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
