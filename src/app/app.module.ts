import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AddComponent } from './expenses/add/add.component';
import { EditComponent } from './expenses/edit/edit.component';
import { ListComponent } from './expenses/list/list.component';
import { AllComponent } from './charts/all/all.component';
import { PersonComponent } from './charts/person/person.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    ListComponent,
    AllComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
