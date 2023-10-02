import { Chip } from './chip';

export class Expense {
  id: number = 0;
  item: string;
  amount: number;
  paidBy: string;
  paidWith: string;
  paidOn: Date;
  category: Chip | null;
  tag: Chip | null;
  comment: string;
  editing: boolean = false;

  constructor(
    item: string,
    amount: number,
    paidBy: string,
    paidWith: string,
    paidOn: Date,
    category: Chip | null,
    tag: Chip | null,
    comment: string
  ) {
    this.item = item;
    this.amount = amount;
    this.paidBy = paidBy;
    this.paidWith = paidWith;
    this.paidOn = paidOn;
    this.category = category;
    this.tag = tag;
    this.comment = comment;
  }
}
