import { AfterContentInit, Component, OnInit } from '@angular/core';

import { EventBusService } from './services/eventBus/event-bus.service';
import { Event } from './models/event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterContentInit {
  errorMessage: string = '';
  showLoader!: boolean;

  constructor(private eventBus: EventBusService) {}

  ngOnInit(): void {
    this.eventBus.on('error').subscribe((event: Event) => {
      this.errorMessage = event.message;
      $('#errorModal').modal('show');
    });
  }

  ngAfterContentInit() {
    this.eventBus.on('loader').subscribe((event: Event) => {
      setTimeout(() => {
        this.showLoader = event.message as boolean;
      });
    });
  }

  closeModal() {
    $('#errorModal').modal('hide');
  }
}
