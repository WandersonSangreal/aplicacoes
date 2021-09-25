import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ListComponent} from './components/list/list.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {CurrencyPipe, registerLocaleData} from "@angular/common";
import ptBR from "@angular/common/locales/pt";
import { RescueComponent } from './components/rescue/rescue.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

registerLocaleData(ptBR);

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    RescueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatToolbarModule
  ],
  providers: [
    CurrencyPipe,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
