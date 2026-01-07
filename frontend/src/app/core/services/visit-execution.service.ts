import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VisitExecution, CreateVisitExecutionDto, UpdateBerthDockDTO } from '../models/visit-execution';

@Injectable({
  providedIn: 'root'
})
export class VisitExecutionService {
  private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<VisitExecution[]> {
    return this.http.get<VisitExecution[]>(`${this.apiUrl}/visit-executions`);
  }

  create(vve: CreateVisitExecutionDto): Observable<VisitExecution> {
    return this.http.post<VisitExecution>(`${this.apiUrl}/visit-executions`, vve);
  }

  updateBerthAndDock(id: string, dto: UpdateBerthDockDTO): Observable<any> {
    return this.http.patch(`${this.apiUrl}/visit-executions/${id}/berth-dock`, dto);
  }
}
