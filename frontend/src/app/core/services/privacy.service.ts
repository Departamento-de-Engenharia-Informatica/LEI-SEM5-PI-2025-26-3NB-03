import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrivacyPolicy } from '../models/privacy';

@Injectable({ providedIn: 'root' })
export class PrivacyService {

  private apiUrl = 'http://localhost:4000/api/privacy';

  constructor(private http: HttpClient) {}


  getLatestPolicy(): Observable<PrivacyPolicy> {
    return this.http.get<PrivacyPolicy>(`${this.apiUrl}/policy`);
  }

  // Descarregar os meus dados (JSON)
  exportData(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/export/${userId}`);
  }

  // Apagar conta
  deleteAccount(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/account/${userId}`);
  }
}
