import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Config } from './app.constants';
import { RemindersComponent } from './components/reminders/reminders.component';

@NgModule({
  declarations: [
    AppComponent,
    RemindersComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [Config],
  bootstrap: [AppComponent]
})
export class AppModule { }
