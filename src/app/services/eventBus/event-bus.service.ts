import { Injectable } from '@angular/core';
import { Subject, Observable, filter } from 'rxjs';
import { Event } from 'src/app/models/event';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private subject: Subject<Event> = new Subject<Event>();

  constructor() {}

  emit(name: any, message: any): void {
    let event = new Event(name, message);
    this.subject.next(event);
  }

  on(name: string): Observable<Event> {
    return this.subject
      .asObservable()
      .pipe(filter((event: Event) => event.name === name));
  }

  any(): Observable<Event> {
    return this.subject.asObservable();
  }
}
