import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { ChipComponent } from './components/chip/chip.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TagsComponent } from './components/tags/tags.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { ChartsComponent } from './views/charts/charts.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ExpensesComponent } from './views/expenses/expenses.component';




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
    ChipComponent,
    LoaderComponent
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
