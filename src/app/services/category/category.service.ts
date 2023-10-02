import { Injectable } from '@angular/core';
import axios from 'axios';
import { Chip } from 'src/app/models/chip';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}
  
  findAll() {
    return axios.get(`${environment.apiUrl}/categories`);
  }

  add(tag: Chip) {
    return axios.post(`${environment.apiUrl}/categories`, tag);
  }

  edit(tag: Chip) {
    return axios.put(`${environment.apiUrl}/categories/${tag.id}`, tag);
  }

  delete(id: number) {
    return axios.delete(`${environment.apiUrl}/categories/${id}`);
  }
}
