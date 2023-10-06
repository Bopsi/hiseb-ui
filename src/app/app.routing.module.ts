import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagsComponent } from './views/tags/tags.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { ChartsComponent } from './views/charts/charts.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ExpensesComponent } from './views/expenses/expenses.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'tags', component: TagsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
