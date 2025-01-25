import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UpdateUser} from '../Interfaces/IUpdateUser';
import {map, Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:8080/api/account"

  constructor(private http:HttpClient,private authService:AuthService) { }

  // update(updateData:UpdateUser,username?:string ):Observable<any>{
  //   console.log(updateData.firstName, updateData.lastName,updateData.password,username)
  //   return this.http.put(`${this.baseUrl}/${username}`,updateData,{
  //     headers:{
  //       "Content-Type":"application/json"
  //     }
  //   })
  // }


  update(updateData: UpdateUser, username?: string): Observable<any> {
    const apiUrl = `${this.baseUrl}/update/${username}`;
    console.log('Sending PUT request to:', apiUrl);
    console.log('Update data:', updateData);
    // const currentUser = localStorage.getItem('currentUser')
    const userString = localStorage.getItem('currentUser')
    let currentUser
    if (typeof userString === "string") {
       currentUser = JSON.parse(userString)
    }
    console.log("This is the token......" + currentUser.token)
    return this.http.put(apiUrl, updateData, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${currentUser.token}`
      },
    }).pipe(
      map((updatedUser:any) =>{
        console.log("This is the response back from the updated backend" + JSON.stringify(updatedUser) )
        localStorage.setItem("currentUser",JSON.stringify(updatedUser))

        this.authService.updatedCurrentUser(updatedUser)
        return updatedUser
      })
    );
  }


  delete( username:string):Observable<any>{
    const userString = localStorage.getItem("currentUser")
    let currentUser
    if(typeof userString === 'string' ){
      currentUser = JSON.parse(userString)

    }
    console.log(username)
      return this.http.delete(`${this.baseUrl}/delete/${username}`,{
       headers:{
         "Content-Type":"application/json",
         "Authorization":`Bearer ${currentUser.token}`
       }
     })
  }

}
