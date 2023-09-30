import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AllComponent } from './components/charts/all/all.component';
import { PersonComponent } from './components/charts/person/person.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddComponent } from './components/expenses/add/add.component';
import { EditComponent } from './components/expenses/edit/edit.component';
import { ListComponent } from './components/expenses/list/list.component';
import { ViewComponent } from './components/expenses/view/view.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    ListComponent,
    AllComponent,
    PersonComponent,
    ViewComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
