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
import {RescueComponent} from './components/rescue/rescue.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule, IConfig} from 'ngx-mask';
import { DialogComponent } from './components/dialog/dialog.component'

registerLocaleData(ptBR);

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    RescueComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatToolbarModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    CurrencyPipe,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
