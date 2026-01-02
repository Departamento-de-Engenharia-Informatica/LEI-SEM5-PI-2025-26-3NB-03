import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  QualificationDto,
  CreateQualificationDto,
  UpdateQualificationDto
} from '../models/qualification';

@Injectable({
  providedIn: 'root'
})
export class QualificationsService {

  private endpoint = 'qualifications';

  constructor(private http: HttpClient) {}

  getAll(): Observable<QualificationDto[]> {
    return this.http.get<QualificationDto[]>(`/api/${this.endpoint}`);
  }

  get(code: string): Observable<QualificationDto> {
    const params = new HttpParams().set('code', code);
    return this.http.get<QualificationDto>(`/api/${this.endpoint}`, { params });
  }

  create(dto: CreateQualificationDto): Observable<QualificationDto> {
    return this.http.post<QualificationDto>(`/api/qualifications`, dto);
  }

  update(code: string, dto: UpdateQualificationDto): Observable<QualificationDto> {
    return this.http.patch<QualificationDto>(`/api/qualifications/${code}`, dto);
  }
}
