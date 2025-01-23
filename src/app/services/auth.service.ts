import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../Interfaces/IUser';
import {ILogin} from '../Interfaces/ILogin';
import {IRegister} from '../Interfaces/IRegister';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "http://localhost:8080/api/auth"
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;


  constructor(private http: HttpClient, private router:Router) {
    const savedUser = localStorage.getItem('currentUser')
    console.log("SAVED User = " + savedUser)
    try{
      this.currentUserSubject = new BehaviorSubject<User | null>(savedUser ? JSON.parse(savedUser):null)

    }catch(error){
      console.error("Error parsing stored user.", error)
      this.currentUserSubject = new BehaviorSubject<User| null>(null)
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    console.log("THIS IS THE CURRENT SUBJECT USER: " + this.currentUserSubject.value)
    return this.currentUserSubject.value
  }

  login(loginData:ILogin): Observable<User> {
    return this.http
      .post<User>(`${this.baseUrl}/signIn`, loginData)
      .pipe(
        map((response:User) => {
          console.log(response)
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response)
          return response
        })
      )
  }

  register(registerData:IRegister) {
    return this.http.post(`${this.baseUrl}/signup`, registerData)
  }

  logOut():void {
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(null)
    this.router.navigate(["/signIn"])

  }

  updatedCurrentUser(updatedUser:User):void{
    this.currentUserSubject.next(updatedUser)

  }


}
