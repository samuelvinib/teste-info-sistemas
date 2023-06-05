import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://private-9d65b3-tinnova.apiary-mock.com/users';

  constructor(private http: HttpClient) { }

  getAll() : Observable<any>{
    return this.http.get(this.apiUrl);
  }
}
