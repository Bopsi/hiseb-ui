import { Component, OnInit } from '@angular/core';
import * as Excel from 'exceljs';
import * as FileSaver from 'file-saver';

import { Chip } from 'src/app/models/chip';
import { TagService } from 'src/app/services/tag/tag.service';
import { EventBusService } from 'src/app/services/eventBus/event-bus.service';

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

  constructor(
    private tagService: TagService,
    private eventBus: EventBusService
  ) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.eventBus.emit('loader', true);
    this.tagService
      .findAll()
      .then((tags: any) => {
        this.tags = tags.data;
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
    this.tagService
      .add(this.tag)
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
    this.eventBus.emit('loader', true);
    this.tagService
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
    this.tagService
      .delete(this.backupTag.id)
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
    this.tag = new Chip('', '#000000', '#ffffff');
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
    this.tag = new Chip('', '#000000', '#ffffff');
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

  export() {
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('Tags');
    sheet.columns = [
      { header: '#', key: 'id' },
      { header: 'Label', key: 'label' },
      { header: 'Background', key: 'background' },
      { header: 'Font', key: 'font' },
    ];
    this.tags.forEach((tag: any, i: number) => {
      sheet.addRow({
        ...tag,
        id: i + 1,
      });
    });

    workbook.xlsx
      .writeBuffer()
      .then((buffer) => FileSaver.saveAs(new Blob([buffer]), `Tags.xlsx`))
      .catch((err) => console.log('Error writing excel export', err));
  }
}
