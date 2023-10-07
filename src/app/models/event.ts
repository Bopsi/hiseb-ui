export class Event {
  name: string;
  message: any;

  constructor(name: string, message?: any) {
    this.name = name;
    this.message = message;
  }
}
