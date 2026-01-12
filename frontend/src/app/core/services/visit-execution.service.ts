import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VisitExecution, CreateVisitExecutionDto } from '../models/visit-execution';
import { UpdateVisitExecutionDto } from '../models/visit-execution';

@Injectable({
  providedIn: 'root'
})
export class VisitExecutionService {


  private apiUrl = 'http://localhost:4000/api';
  private readonly baseUrl = 'http://localhost:4000/api/visit-executions';


  constructor(private http: HttpClient) { }

  create(vve: CreateVisitExecutionDto): Observable<VisitExecution> {
    return this.http.post<VisitExecution>(`${this.apiUrl}/visit-executions`, vve);
  }

   getAll(): Observable<VisitExecution[]> {
    return this.http.get<VisitExecution[]>(this.baseUrl);
  }

  update(id: string, dto: UpdateVisitExecutionDto): Observable<VisitExecution> {
    return this.http.patch<VisitExecution>(`${this.baseUrl}/${id}`, dto);
  }
}
