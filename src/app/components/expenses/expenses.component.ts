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
        category: {
          label: 'Grocery',
          backgroundColor: '#000099',
          fontColor: '#FFFFFF',
        },
        tag: {
          label: 'Essential',
          backgroundColor: '#990099',
          fontColor: '#FFFFFF',
        },
        note: 'Milk, Bread, Butter and Orancge Juice',
      },
      {
        date: '2023-09-15',
        item: 'Medicine',
        paidBy: 'Balaka Chatterjee',
        paidWith: 'Cash',
        amount: '788.99',
        category: {
          label: 'Medical',
          backgroundColor: '#990000',
          fontColor: '#FFFFFF',
        },
        tag: {
          label: 'Baby',
          backgroundColor: '#009999',
          fontColor: '#FFFFFF',
        },
        note: 'Antacid and Laxative',
      },
      {
        date: '2023-09-01',
        item: 'Zomato',
        paidBy: 'Bappaditya Sasmal',
        paidWith: 'Credit Card',
        amount: '876.99',
        category: {
          label: 'Others',
          backgroundColor: '#009900',
          fontColor: '#FFFFFF',
        },
        tag: {
          label: 'Luxury',
          backgroundColor: '#999900',
          fontColor: '#FFFFFF',
        },
        note: 'Chiken Biryani',
      },
    ];
  }

  getTagColor(tag: string): string {
    return this.tagColors[tag];
  }
}
