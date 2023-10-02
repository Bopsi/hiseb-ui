import { Component, OnInit } from '@angular/core';
import { Chip } from 'src/app/models/chip';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  tags!: Array<Chip>;
  addEnabled: boolean = false;
  tag!: Chip;

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
      this.cancel();
      this.get();
    });
  }

  enableAdd() {
    this.tag = new Chip('', '#000000', '#FFFFFF');
    this.addEnabled = true;
  }

  reset() {
    this.tag = new Chip('', '#000000', '#FFFFFF');
  }

  cancel() {
    this.addEnabled = false;
  }
}
