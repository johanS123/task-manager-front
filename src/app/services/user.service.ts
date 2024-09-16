import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private domain = `http://localhost:8000`;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(`${this.domain}/api/users`);
  }

  getUsersId(id: number) {
    return this.http.get<any>(`${this.domain}/api/users/${id}`);
  }
}
