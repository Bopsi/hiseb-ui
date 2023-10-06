import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  @Input() show: boolean = true;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.blink('plus');
    }, 0);
    setTimeout(() => {
      this.blink('minus');
    }, 500);
    setTimeout(() => {
      this.blink('multiply');
    }, 1000);
    setTimeout(() => {
      this.blink('divide');
    }, 1500);
  }

  blink(id: string) {
    let elem = $(`#${id}`);
    setInterval(() => {
      elem.fadeOut('slow');
    }, 1000);

    setTimeout(() => {
      setInterval(() => {
        elem.fadeIn('slow');
      }, 1000);
    }, 1000);
  }
}
