import { Component, OnInit } from '@angular/core';
/*----- required imports dont delete */
import * as bootstrap from 'bootstrap';
import * as jQuery from 'jquery';
/*----- required imports dont delete */
import * as Excel from 'exceljs';
import * as FileSaver from 'file-saver';
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

  showLoader: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private tagService: TagService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.showLoader = true;
    Promise.all([this.categoryService.findAll(), this.tagService.findAll()])
      .then(([categories, tags]) => {
        this.categories = categories.data;
        this.tags = tags.data;
        this.get();
      })
      .catch(() => {})
      .finally(() => {
        this.showLoader = false;
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

  export() {
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('Expenses');
    sheet.columns = [
      { header: '#', key: 'id' },
      { header: 'Item', key: 'item' },
      { header: 'Paid By', key: 'paidBy' },
      { header: 'Paid With', key: 'paidWith' },
      { header: 'Paid On', key: 'paidOn' },
      { header: 'Category', key: 'category' },
      { header: 'Tag', key: 'tag' },
      { header: 'Comment', key: 'comment' },
    ];
    this.expenses.forEach((expense: any, i: number) => {
      sheet.addRow({
        ...expense,
        id: i + 1,
        category: expense.category.label,
        tag: expense.tag.label,
      });
    });

    workbook.xlsx
      .writeBuffer()
      .then((buffer) =>
        FileSaver.saveAs(new Blob([buffer]), `Expenses.xlsx`)
      )
      .catch((err) => console.log('Error writing excel export', err));
  }
}
