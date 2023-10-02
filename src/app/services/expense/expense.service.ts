import { Injectable } from '@angular/core';
import axios from 'axios';
import { Expense } from 'src/app/models/expense';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor() {}

  findAll() {
    return axios.get(`${environment.apiUrl}/expenses`);
  }

  add(expense: Expense) {
    return axios.post(`${environment.apiUrl}/expenses`, expense);
  }

  edit(expense: Expense) {
    return axios.put(`${environment.apiUrl}/expenses/${expense.id}`, expense);
  }

  delete(id: number) {
    return axios.delete(`${environment.apiUrl}/expenses/${id}`);
  }

  search(criteria: string) {
    return axios.get(`${environment.apiUrl}/expenses/search`, {
      params: { query: criteria },
    });
  }
}
