import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  getUsersId(id: number) {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }
}
