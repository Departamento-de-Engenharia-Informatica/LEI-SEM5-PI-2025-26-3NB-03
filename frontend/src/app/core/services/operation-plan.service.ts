import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperationPlan, CreateOperationPlanDto, UpdateOperationPlanDto } from '../models/operation-plan';

@Injectable({ providedIn: 'root' })
export class OperationPlanService {
  private apiUrl = 'http://localhost:4000/api/operation-plans';

  constructor(private http: HttpClient) { }

  generate(dto: CreateOperationPlanDto): Observable<OperationPlan> {
    return this.http.post<OperationPlan>(this.apiUrl, dto);
  }

  getAll(vesselId?: string, date?: string): Observable<OperationPlan[]> {
    let params = new HttpParams();
    if (vesselId) params = params.set('vesselId', vesselId);
    if (date) params = params.set('date', date);
    return this.http.get<OperationPlan[]>(this.apiUrl, { params });
  }

  update(id: string, dto: UpdateOperationPlanDto): Observable<OperationPlan> {
    return this.http.patch<OperationPlan>(`${this.apiUrl}/${id}`, dto);
  }
}
