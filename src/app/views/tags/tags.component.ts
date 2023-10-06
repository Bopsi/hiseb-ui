import { Component, OnInit } from '@angular/core';
/*----- required imports dont delete */
import * as bootstrap from 'bootstrap';
import * as jQuery from 'jquery';
/*----- required imports dont delete */
import { Chip } from 'src/app/models/chip';
import { TagService } from 'src/app/services/tag/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  tags!: Array<Chip>;
  tag!: Chip;
  backupTag!: Chip;
  addEnabled: boolean = false;
  editEnabled: boolean = false;

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.tagService.findAll().then((tags: any) => {
      this.tags = tags.data;
    });
  }

  add() {
    this.tagService.add(this.tag).then(() => {
      this.cancelAdd();
      this.get();
    });
  }

  edit(item: Chip) {
    this.tagService.edit(item).then(() => {
      this.cancelEdit(item);
      this.get();
    });
  }

  remove() {
    this.tagService.delete(this.backupTag.id).then(() => {
      this.cancelDelete();
      this.get();
    });
  }

  enableAdd() {
    this.tag = new Chip('', '#000000', '#FFFFFF');
    this.addEnabled = true;
  }

  enableEdit(item: any) {
    item.editing = true;
    this.backupTag = { ...item };
    this.editEnabled = true;
  }

  enableDelete(item: any) {
    this.backupTag = { ...item };
    $('#deleteTag').modal('show');
  }

  resetAdd() {
    this.tag = new Chip('', '#000000', '#FFFFFF');
  }

  resetEdit(item: Chip) {
    item.label = this.backupTag.label;
    item.background = this.backupTag.background;
    item.font = this.backupTag.font;
  }

  cancelAdd() {
    this.addEnabled = false;
  }

  cancelEdit(item: any) {
    item.editing = false;
    this.editEnabled = false;
  }

  cancelDelete() {
    $('#deleteTag').modal('hide');
  }
}
