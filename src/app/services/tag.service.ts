import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Chip } from '../models/chip';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor() { 
    
  }

  findAll() {
    return axios.get(`${environment.apiUrl}/tags`); 
  }

  add(tag: Chip) {
    return axios.post(`${environment.apiUrl}/tags`, tag); 
  }
}
