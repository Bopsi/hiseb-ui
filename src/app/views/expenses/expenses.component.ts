import { Component, OnInit, Output, EventEmitter } from '@angular/core';
/*----- required imports dont delete */
import * as bootstrap from 'bootstrap';
import * as jQuery from 'jquery';
/*----- required imports dont delete */
import * as Excel from 'exceljs';
import * as FileSaver from 'file-saver';
import * as _ from 'lodash';
import { Expense } from 'src/app/models/expense';
import { CategoryService } from 'src/app/services/category/category.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { ExpenseService } from 'src/app/services/expense/expense.service';
import { Chip } from 'src/app/models/chip';
import { EventBusService } from 'src/app/services/eventBus/event-bus.service';

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
  expenseError: any = {
    item: '',
    amount: '',
    paidBy: '',
    paidOn: '',
    paidWith: '',
    category: '',
    tag: '',
  };

  @Output() error: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private categoryService: CategoryService,
    private tagService: TagService,
    private expenseService: ExpenseService,
    private eventBus: EventBusService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.eventBus.emit('loader', true);
    Promise.all([this.categoryService.findAll(), this.tagService.findAll()])
      .then(([categories, tags]) => {
        this.categories = categories.data;
        this.tags = tags.data;
        this.get();
      })
      .catch((e) => {
        this.eventBus.emit('error', e.response.data.message);
      });
  }

  get() {
    this.eventBus.emit('loader', true);
    this.expenseService
      .findAll()
      .then((expenses: any) => {
        this.expenses = expenses.data;
      })
      .catch((e) => {
        this.eventBus.emit('error', e.response.data.message);
      })
      .finally(() => {
        this.eventBus.emit('loader', false);
      });
  }

  add() {
    this.eventBus.emit('loader', true);
    this.expenseService
      .add(this.expense)
      .then(() => {
        this.cancelAdd();
        this.get();
      })
      .catch((e) => {
        this.eventBus.emit('error', e.response.data.message);
      })
      .finally(() => {
        this.eventBus.emit('loader', false);
      });
  }

  edit(item: Expense) {
    this.eventBus.emit('loader', true);
    this.expenseService
      .edit(item)
      .then(() => {
        this.cancelEdit(item);
        this.get();
      })
      .catch((e) => {
        this.eventBus.emit('error', e.response.data.message);
      })
      .finally(() => {
        this.eventBus.emit('loader', false);
      });
  }

  remove() {
    this.eventBus.emit('loader', true);
    this.expenseService
      .delete(this.backupExpense.id)
      .then(() => {
        this.get();
      })
      .catch((e) => {
        this.eventBus.emit('error', e.response.data.message);
      })
      .finally(() => {
        this.cancelDelete();
        this.eventBus.emit('loader', false);
      });
  }

  enableAdd() {
    this.expense = new Expense('', '', '', '', '', null, null, '');
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
    this.expense = new Expense('', '', '', '', '', null, null, '');
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
      .then((buffer) => FileSaver.saveAs(new Blob([buffer]), `Expenses.xlsx`))
      .catch((err) => console.log('Error writing excel export', err));
  }

  submit(e: any) {
    e.stopPropagation();
    let isValid = this.validate();

    if (isValid) {
      if (this.addEnabled) {
        this.add();
      } else {
        let expense = _.find(this.expenses, (expense) => {
          return expense.editing;
        });
        if (expense) {
          this.edit(expense);
        }
      }
    }
  }

  equals(o1: Chip, o2: Chip) {
    return (o1 ? o1.label : o1) == (o2 ? o2.label : o2);
  }

  validate(): boolean {
    let valid = true;

    this.expenseError = {
      item: '',
      amount: '',
      paidBy: '',
      paidOn: '',
      paidWith: '',
      category: '',
      tag: '',
    };

    if (this.addEnabled) {
      valid = this.validateField('item', this.expense.item) && valid;
      valid = this.validateField('amount', this.expense.amount) && valid;
      valid = this.validateField('paidBy', this.expense.paidBy) && valid;
      valid = this.validateField('paidOn', this.expense.paidOn) && valid;
      valid = this.validateField('paidWith', this.expense.paidWith) && valid;
      valid = this.validateField('category', this.expense.category) && valid;
      valid = this.validateField('tag', this.expense.tag) && valid;
    } else {
      let expense = _.find(this.expenses, (expense) => {
        return expense.editing;
      });

      if (!expense) {
        return false;
      }

      valid = this.validateField('item', expense.item) && valid;
      valid = this.validateField('amount', expense.amount) && valid;
      valid = this.validateField('paidBy', expense.paidBy) && valid;
      valid = this.validateField('paidOn', expense.paidOn) && valid;
      valid = this.validateField('paidWith', expense.paidWith) && valid;
      valid = this.validateField('category', expense.category) && valid;
      valid = this.validateField('tag', expense.tag) && valid;
    }

    return valid;
  }

  validateField(name: string, value: any): boolean {
    if (this.expenseError[name]) {
      this.expenseError[name] = '';
    }
    switch (name) {
      case 'item':
        let iflag = true;
        if (value.item == '') {
          this.expenseError.item = 'Item is requried';
          iflag = false;
        } else if (value.length < 3) {
          this.expenseError.item = 'Minimum length is 3';
          iflag = false;
        }
        return iflag;
      case 'amount':
        let aflag = true;
        if (value == '') {
          this.expenseError.amount = 'Amount is requried';
          return false;
        }
        break;
      case 'paidBy':
        if (value == '') {
          this.expenseError.paidBy = 'Paid By is requried';
          return false;
        }
        break;
      case 'paidOn':
        if (value == '') {
          this.expenseError.paidOn = 'Paid On is requried';
          return false;
        }
        break;
      case 'paidWith':
        if (value == '') {
          this.expenseError.paidWith = 'Paid With is requried';
          return false;
        }
        break;
      case 'category':
        if (value == null) {
          this.expenseError.category = 'Category is requried';
          return false;
        }
        break;
      case 'tag':
        if (value == null) {
          this.expenseError.tag = 'Tag is requried';
          return false;
        }
        break;
    }
    return true;
  }
}
