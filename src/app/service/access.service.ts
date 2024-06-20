import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../setttings/appsettings';
import { Observable } from 'rxjs';
import { Register } from '../Interfaces/Register';
import { Login } from '../Interfaces/Login';
import { Token } from '../Interfaces/Token';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  private http = inject(HttpClient);
  private BaseUrl : string = appsettings.apiUrl;
  constructor() { }

  Registro(model:Register) : Observable<any>
  {
    return this.http.post<any>(`${this.BaseUrl}User/Register`, model)
  }

  Login(model:Login) : Observable<Token>
  {
    return this.http.post<Token>(`${this.BaseUrl}User/Login`, model)
  }
}
