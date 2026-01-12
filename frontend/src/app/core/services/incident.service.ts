import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident';

@Injectable({ providedIn: 'root' })
export class IncidentService {
  private apiUrl = 'http://localhost:4000/api/incidents';

  constructor(private http: HttpClient) {}

  create(incident: any): Observable<Incident> {
    return this.http.post<Incident>(this.apiUrl, incident);
  }

  getAll(filters?: any): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.apiUrl, { params: filters });
  }

  resolve(id: string, endTime: string): Observable<Incident> {
    return this.http.patch<Incident>(`${this.apiUrl}/${id}`, {
      status: 'RESOLVED',
      endTime: endTime
    });
  }
}
