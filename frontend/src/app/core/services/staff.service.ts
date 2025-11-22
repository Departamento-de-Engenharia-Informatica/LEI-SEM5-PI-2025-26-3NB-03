import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  StaffMemberDto,
  CreateStaffMemberDto,
  UpdateStaffMemberDto
} from '../models/staff';

@Injectable({ providedIn: 'root' })
export class StaffService {

  private baseUrl = '/api/staffmembers';

  constructor(private http: HttpClient) {}

  search(code?: string, name?: string): Observable<StaffMemberDto[]> {
    return this.http.get<StaffMemberDto[]>(this.baseUrl, {
      params: { code: code ?? '', name: name ?? '' }
    });
  }

  create(dto: CreateStaffMemberDto): Observable<StaffMemberDto> {
    return this.http.post<StaffMemberDto>(this.baseUrl, dto);
  }

  update(code: string, dto: UpdateStaffMemberDto): Observable<StaffMemberDto> {
    return this.http.patch<StaffMemberDto>(`${this.baseUrl}/${code}`, dto);
  }
}
