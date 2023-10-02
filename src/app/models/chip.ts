export class Chip {
  id: number = 0;
  label: string;
  background: string;
  font: string;
  editing: boolean = false;

  constructor(label: string, background: string, font: string) {
    this.label = label;
    this.background = background;
    this.font = font;
  }
}
