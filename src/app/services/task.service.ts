import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Results } from '../models/results';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private domain = `http://localhost:8000`;

  constructor(private http: HttpClient) {}

  getTasks({ pageSize }: any) {
    const params = new HttpParams().set('per_page', pageSize);

    return this.http
      .get<Results>(`${this.domain}/api/tasks`, { params })
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

    return this.http.post(`${this.domain}/api/tasks`, bodySend);
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
    return this.http.put<any>(`${this.domain}/api/tasks/${id}`, bodySend);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.domain}/api/tasks/${id}`);
  }
}
