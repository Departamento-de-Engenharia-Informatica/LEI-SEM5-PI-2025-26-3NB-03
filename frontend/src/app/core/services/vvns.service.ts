import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VvnsService {

  private base = '/api/vvns';

  constructor(private http: HttpClient) {}

  search(filters: any) {
    let params = new HttpParams();

    Object.keys(filters).forEach(k => {
      if (filters[k]) params = params.set(k, filters[k]);
    });

    const headers = new HttpHeaders({
      'X-Roles': 'SHIPPING_AGENT_REP',
      'X-Org-Id': 'ORG-123'
    });

    return this.http.get<any[]>(this.base, {
      params,
      headers
    });
  }
}
