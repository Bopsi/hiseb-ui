import { Component, OnInit , Input} from '@angular/core';
import { Chip } from 'src/app/models/chip';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent implements OnInit {
  @Input() chip!: Chip;

  constructor() { }

  ngOnInit(): void {
  }

}
