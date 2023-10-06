import { Component, OnInit } from '@angular/core';
/*----- required imports dont delete */
import * as bootstrap from 'bootstrap';
import * as jQuery from 'jquery';
/*----- required imports dont delete */
import { Expense } from 'src/app/models/expense';
import { CategoryService } from 'src/app/services/category/category.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { ExpenseService } from 'src/app/services/expense/expense.service';
import { Chip } from 'src/app/models/chip';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  categories!: Array<Chip>;
  tags!: Array<Chip>;
  expenses!: Array<Expense>;
  expense!: Expense;
  backupExpense!: Expense;
  addEnabled: boolean = false;
  editEnabled: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private tagService: TagService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    Promise.all([
      this.categoryService.findAll(),
      this.tagService.findAll(),
    ]).then(([categories, tags]) => {
      this.categories = categories.data;
      this.tags = tags.data;
      this.get()
    });
  }

  get() {
    this.expenseService.findAll().then((expenses: any) => {
      this.expenses = expenses.data;
    });
  }

  add() {
    this.expenseService.add(this.expense).then(() => {
      this.cancelAdd();
      this.get();
    });
  }

  edit(item: Expense) {
    this.expenseService.edit(item).then(() => {
      this.cancelEdit(item);
      this.get();
    });
  }

  remove() {
    this.expenseService.delete(this.backupExpense.id).then(() => {
      this.cancelDelete();
      this.get();
    });
  }

  enableAdd() {
    this.expense = new Expense('', 0.0, '', '', new Date(), null, null, '');
    this.addEnabled = true;
  }

  enableEdit(item: any) {
    item.editing = true;
    this.backupExpense = { ...item };
    this.editEnabled = true;
  }

  enableDelete(item: any) {
    this.backupExpense = { ...item };
    $('#deleteExpense').modal('show');
  }

  resetAdd() {
    this.expense = new Expense('', 0.0, '', '', new Date(), null, null, '');
  }

  resetEdit(item: Expense) {
    item.item = this.backupExpense.item;
    item.amount = this.backupExpense.amount;
    item.paidBy = this.backupExpense.paidBy;
    item.paidWith = this.backupExpense.paidWith;
    item.paidOn = this.backupExpense.paidOn;
    item.category = this.backupExpense.category;
    item.tag = this.backupExpense.tag;
    item.comment = this.backupExpense.comment;
  }

  cancelAdd() {
    this.addEnabled = false;
  }

  cancelEdit(item: any) {
    item.editing = false;
    this.editEnabled = false;
  }

  cancelDelete() {
    $('#deleteExpense').modal('hide');
  }
}
