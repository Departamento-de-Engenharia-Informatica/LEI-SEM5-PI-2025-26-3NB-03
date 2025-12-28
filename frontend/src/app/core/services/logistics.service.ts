import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskCategory, CreateTaskCategoryDto } from '../models/task-category';

@Injectable({ providedIn: 'root' })
export class LogisticsService {

  private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}


  createCategory(dto: CreateTaskCategoryDto): Observable<TaskCategory> {
    return this.http.post<TaskCategory>(`${this.apiUrl}/complementary-task-categories`, dto);
  }

  getCategories(): Observable<TaskCategory[]> {
    return this.http.get<TaskCategory[]>(`${this.apiUrl}/complementary-task-categories`);
  }
}
