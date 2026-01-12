import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLogDto } from '../models/visit-execution';

@Injectable({ providedIn: 'root' })
export class AuditLogService {
  private readonly baseUrl = 'http://localhost:4000/api/audit-logs';

  constructor(private http: HttpClient) {}

  getByEntityId(entityId: string): Observable<AuditLogDto[]> {
    return this.http.get<AuditLogDto[]>(
      `${this.baseUrl}?entityId=${encodeURIComponent(entityId)}`
    );
  }
}
