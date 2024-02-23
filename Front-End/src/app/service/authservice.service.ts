import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http:HttpClient) { }

  getReisterApi(reqbody:any){
    return this.http.post(`${environment.baseUrl}/register`,reqbody)
  }

  getLoginApi(reqbody:any){
    return this.http.post(`${environment.baseUrl}/login`,reqbody)
  }
}
