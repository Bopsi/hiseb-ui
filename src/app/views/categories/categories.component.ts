import { Component, OnInit } from '@angular/core';
/*----- required imports dont delete */
import * as bootstrap from 'bootstrap';
import * as jQuery from 'jquery';
/*----- required imports dont delete */
import { Chip } from 'src/app/models/chip';
import { CategoryService } from 'src/app/services/category/category.service';

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

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.categoryService.findAll().then((categories: any) => {
      this.categories = categories.data;
    });
  }

  add() {
    this.categoryService.add(this.category).then(() => {
      this.cancelAdd();
      this.get();
    });
  }

  edit(item: Chip) {
    this.categoryService.edit(item).then(() => {
      this.cancelEdit(item);
      this.get();
    });
  }

  remove() {
    this.categoryService.delete(this.backupCategory.id).then(() => {
      this.cancelDelete();
      this.get();
    });
  }

  enableAdd() {
    this.category = new Chip('', '#000000', '#FFFFFF');
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
    this.category = new Chip('', '#000000', '#FFFFFF');
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
}
