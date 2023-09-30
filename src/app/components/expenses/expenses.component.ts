import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  expenses: Array<any> = new Array();
  tagColors: any = new Object();

  constructor() {}

  ngOnInit(): void {
    this.setData();
  }

  setData() {
    this.tagColors = {
      Essential: '#0000ff',
      Baby: '#00ff00',
      Luxury: '#ff0000',
    };

    this.expenses = [
      {
        date: '2023-09-01',
        item: 'Blinkit',
        paidBy: 'Bappaditya Sasmal',
        paidWith: 'UPI',
        amount: '1234.56',
        category: 'Grocery',
        tag: 'Essential',
        note: 'Milk, Bread, Butter and Orancge Juice',
      },
      {
        date: '2023-09-15',
        item: 'Medicine',
        paidBy: 'Balaka Chatterjee',
        paidWith: 'Cash',
        amount: '788.99',
        category: 'Medical',
        tag: 'Baby',
        note: 'Antacid and Laxative',
      },
      {
        date: '2023-09-01',
        item: 'Zomato',
        paidBy: 'Bappaditya Sasmal',
        paidWith: 'Credit Card',
        amount: '876.99',
        category: 'Others',
        tag: 'Luxury',
        note: 'Chiken Biryani',
      },
    ];
  }

  getTagColor(tag: string): string {
    return this.tagColors[tag];
  }
}
