import { Injectable } from '@angular/core';
import axios from 'axios';
import { Chip } from 'src/app/models/chip';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor() {}

  findAll() {
    return axios.get(`${environment.apiUrl}/tags`);
  }

  add(tag: Chip) {
    return axios.post(`${environment.apiUrl}/tags`, tag);
  }

  edit(tag: Chip) {
    return axios.put(`${environment.apiUrl}/tags/${tag.id}`, tag);
  }

  delete(id: number) {
    return axios.delete(`${environment.apiUrl}/tags/${id}`);
  }
}
