import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:string = "http://localhost:8080/api/auth"
  constructor(private http:HttpClient) { }

  register(firstName:string,lastName:string,username:string,password:string){
    return this.http.post(`${this.baseUrl}/signup`,{firstName,lastName,username,password})
  }


}
