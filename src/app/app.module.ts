import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ChartsComponent } from './components/charts/charts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { TagsComponent } from './components/tags/tags.component';
import { ChipComponent } from './components/chip/chip.component';
import { CategoriesComponent } from './components/categories/categories.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ExpensesComponent,
    ChartsComponent,
    CategoriesComponent,
    TagsComponent,
    ChipComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
