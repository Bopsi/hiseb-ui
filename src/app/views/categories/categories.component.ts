import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as Excel from 'exceljs';
import * as FileSaver from 'file-saver';

import { Chip } from 'src/app/models/chip';
import { CategoryService } from 'src/app/services/category/category.service';
import { EventBusService } from 'src/app/services/eventBus/event-bus.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories!: Array<Chip>;
  category!: Chip;
  backupCategory!: Chip;
  addEnabled: boolean = false;
  editEnabled: boolean = false;

  @Output() error: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private categoryService: CategoryService,
    private eventBus: EventBusService
  ) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.eventBus.emit('loader', true);
    this.categoryService
      .findAll()
      .then((categories: any) => {
        this.categories = categories.data;
      })
      .catch((e) => {
        this.eventBus.emit('error', e.response.data.message);
      })
      .finally(() => {
        this.eventBus.emit('loader', false);
      });
  }

  add() {
    this.categoryService
      .add(this.category)
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

  edit(item: Chip) {
    this.categoryService
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
    this.categoryService
      .delete(this.backupCategory.id)
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
    this.category = new Chip('', '#000000', '#ffffff');
    this.addEnabled = true;
  }

  enableEdit(item: any) {
    item.editing = true;
    this.backupCategory = { ...item };
    this.editEnabled = true;
  }

  enableDelete(item: any) {
    this.backupCategory = { ...item };
    $('#deleteCategory').modal('show');
  }

  resetAdd() {
    this.category = new Chip('', '#000000', '#ffffff');
  }

  resetEdit(item: Chip) {
    item.label = this.backupCategory.label;
    item.background = this.backupCategory.background;
    item.font = this.backupCategory.font;
  }

  cancelAdd() {
    this.addEnabled = false;
  }

  cancelEdit(item: any) {
    item.editing = false;
    this.editEnabled = false;
  }

  cancelDelete() {
    $('#deleteCategory').modal('hide');
  }

  export() {
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('Categories');
    sheet.columns = [
      { header: '#', key: 'id' },
      { header: 'Label', key: 'label' },
      { header: 'Background', key: 'background' },
      { header: 'Font', key: 'font' },
    ];
    this.categories.forEach((expense: any, i: number) => {
      sheet.addRow({
        ...expense,
        id: i + 1,
      });
    });

    workbook.xlsx
      .writeBuffer()
      .then((buffer) => FileSaver.saveAs(new Blob([buffer]), `Categories.xlsx`))
      .catch((err) => console.log('Error writing excel export', err));
  }
}
