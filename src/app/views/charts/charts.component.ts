import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense/expense.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  expenses: Array<Expense> = new Array();
  stats: any = {
    paidBy: {
      labels: [],
      values: [],
    },
    paidWith: {
      labels: [],
      values: [],
    },
    category: {
      labels: [],
      values: [],
      colors: [],
    },
    tag: {
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
        this.initAmountVsPaidWith();
        this.initAmountVsCategory();
        this.initAmountVsTag();
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

  initAmountVsPaidWith() {
    const canvas = <HTMLCanvasElement>(
      document.getElementById('amountVsPaidWith')
    );
    if (canvas) {
      let ctx = canvas.getContext('2d');
      if (ctx) {
        let myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: this.stats.paidWith.labels,
            datasets: [
              {
                data: this.stats.paidWith.values,
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

  initAmountVsTag() {
    const canvas = <HTMLCanvasElement>document.getElementById('amountVsTag');
    if (canvas) {
      let ctx = canvas.getContext('2d');
      if (ctx) {
        let myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: this.stats.tag.labels,
            datasets: [
              {
                data: this.stats.tag.values,
                backgroundColor: this.stats.tag.colors,
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
    const methods: Map<string, number> = new Map();
    const categories: Map<string, number> = new Map();
    const catColors: Map<string, string> = new Map();
    const tags: Map<string, number> = new Map();
    const tagColors: Map<string, string> = new Map();

    for (let exp of this.expenses) {
      if (!payers.has(exp.paidBy)) {
        payers.set(exp.paidBy, 0);
      }
      let v = payers.get(exp.paidBy);
      if (v != undefined) {
        payers.set(exp.paidBy, v + exp.amount);
      }
      //-------------------
      if (!methods.has(exp.paidWith)) {
        methods.set(exp.paidWith, 0);
      }
      v = methods.get(exp.paidWith);
      if (v != undefined) {
        methods.set(exp.paidWith, v + exp.amount);
      }
      //-------------------
      let category = exp.category || { label: '', background: '' };
      if (!categories.has(category.label)) {
        categories.set(category.label, 0);
      }
      v = categories.get(category.label);
      if (v != undefined) {
        categories.set(category.label, v + exp.amount);
      }
      //- - - - - - - - - -
      if (!catColors.has(category.background)) {
        catColors.set(category.label, category.background);
      }
      //------------------
      let tag = exp.tag || { label: '', background: '' };
      if (!tags.has(tag.label)) {
        tags.set(tag.label, 0);
      }
      v = tags.get(tag.label);
      if (v != undefined) {
        tags.set(tag.label, v + exp.amount);
      }
      //- - - - - - - - - -
      if (!tagColors.has(tag.background)) {
        tagColors.set(tag.label, tag.background);
      }
    }

    this.stats.paidBy.labels = Array.from(payers.keys());
    this.stats.paidBy.values = Array.from(payers.values());

    this.stats.paidWith.labels = Array.from(methods.keys());
    this.stats.paidWith.values = Array.from(methods.values());

    this.stats.category.labels = Array.from(categories.keys());
    this.stats.category.values = Array.from(categories.values());
    this.stats.category.colors = Array.from(catColors.values());

    this.stats.tag.labels = Array.from(tags.keys());
    this.stats.tag.values = Array.from(tags.values());
    this.stats.tag.colors = Array.from(tagColors.values());
  }
}
