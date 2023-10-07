import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense/expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  expenses: Array<Expense> = new Array();
  stats: any = {
    paidBy: {
      labels: [],
      values: [],
    },
    category: {
      labels: [],
      values: [],
      colors: [],
    },
  };

  showLoader: boolean = false;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.showLoader = true;
    this.expenseService
      .findAll()
      .then((expenses) => {
        this.expenses = expenses.data;
        this.generateStats();
        this.initAmountVsPaidBy();
        this.initAmountVsCategory();
      })
      .catch(() => {})
      .finally(() => {
        this.showLoader = false;
      });
  }

  initAmountVsPaidBy() {
    const canvas = <HTMLCanvasElement>document.getElementById('amountVsPaidBy');
    if (canvas) {
      let ctx = canvas.getContext('2d');
      if (ctx) {
        let myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: this.stats.paidBy.labels,
            datasets: [
              {
                data: this.stats.paidBy.values,
                borderWidth: 1,
              },
            ],
          },
          options: {},
        });
      }
    }
  }

  initAmountVsCategory() {
    const canvas = <HTMLCanvasElement>(
      document.getElementById('amountVsCategory')
    );
    if (canvas) {
      let ctx = canvas.getContext('2d');
      if (ctx) {
        let myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: this.stats.category.labels,
            datasets: [
              {
                data: this.stats.category.values,
                backgroundColor: this.stats.category.colors,
                borderWidth: 1,
              },
            ],
          },
          options: {},
        });
      }
    }
  }

  generateStats() {
    const payers: Map<string, number> = new Map();

    const categories: Map<string, number> = new Map();
    const catColors: Map<string, string> = new Map();

    for (let exp of this.expenses) {
      if (!payers.has(exp.paidBy)) {
        payers.set(exp.paidBy, 0);
      }
      let v = payers.get(exp.paidBy);
      if (v != undefined) {
        payers.set(exp.paidBy, v + Number(exp.amount));
      }

      //-------------------
      let category = exp.category || { label: '', background: '' };
      if (!categories.has(category.label)) {
        categories.set(category.label, 0);
      }
      v = categories.get(category.label);
      if (v != undefined) {
        categories.set(category.label, v + Number(exp.amount));
      }
      //- - - - - - - - - -
      if (!catColors.has(category.background)) {
        catColors.set(category.label, category.background);
      }
    }

    this.stats.paidBy.labels = Array.from(payers.keys());
    this.stats.paidBy.values = Array.from(payers.values());

    this.stats.category.labels = Array.from(categories.keys());
    this.stats.category.values = Array.from(categories.values());
    this.stats.category.colors = Array.from(catColors.values());
  }
}
