import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {JobApplicationForm} from '../Interfaces/JobApplicationForm';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  private baseUrl = 'http://localhost:8080/api/application'
  // Subject to hold the state of job applications
  private jobApplicationSubject: BehaviorSubject<JobApplicationForm[]> = new BehaviorSubject<JobApplicationForm[]>([])

  //Observable for components to subscribe to job application changes
  public jobApplications$: Observable<JobApplicationForm[]> = this.jobApplicationSubject.asObservable()


  constructor(private http: HttpClient) {
  }

  fetchToken():string{
    const userInfo = localStorage.getItem("currentUser")
    let currentUser
    if(typeof userInfo === 'string'){
      currentUser = JSON.parse(userInfo)
    }
    return currentUser.token
  }

  createJobApplication(jobApplicationData: JobApplicationForm): Observable<any> {
    const userInfo = localStorage.getItem("currentUser")
    let currentUser
    if (typeof userInfo === "string") {
      currentUser = JSON.parse(userInfo)
    }
    const token = currentUser.token
    return this.http.post(`${this.baseUrl}/create`, jobApplicationData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
  }

  fetchAllJobApplication():void{
    const token = this.fetchToken()
     this.http.get<JobApplicationForm[]>(`${this.baseUrl}/all-job-application`,{
       headers:{
         "Authorization":`Bearer ${token}`
       }
     }).subscribe((jobApplications) =>{
       this.jobApplicationSubject.next(jobApplications)
     })

  }

}
