import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Results } from '../models/results';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTasks({ pageSize }: any) {
    const params = new HttpParams().set('per_page', pageSize);

    return this.http
      .get<Results>(`${this.apiUrl}/tasks`, { params })
      .pipe((resp: any) => {
        return resp;
      });
  }

  postTask(body: any): Observable<any> {
    let { title, description, expirationDate, userAssign, userCreate } = body;

    let bodySend = {
      title,
      description,
      expirationDate,
      isActive: true,
      isComplete: false,
      userCreateId: userCreate,
      userAssignId: userAssign.id,
    };

    return this.http.post(`${this.apiUrl}/tasks`, bodySend);
  }

  putTask(body: any, id: number): Observable<any> {
    let { title, description, expirationDate, userAssign, userCreate } = body;

    let bodySend = {
      title,
      description,
      expirationDate,
      isActive: true,
      isComplete: false,
      userCreateId: userCreate,
      userAssignId: userAssign,
    };
    return this.http.put<any>(`${this.apiUrl}/tasks/${id}`, bodySend);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }

  patchTask(body: any, id: number) {
    return this.http.patch(`${this.apiUrl}/tasks/${id}`, body);
  }
}
