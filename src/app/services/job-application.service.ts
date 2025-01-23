import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {IJobApplicationForm} from '../Interfaces/IJobApplicationForm';
import {IUpdateJobApplication} from '../Interfaces/IUpdateJobApplication';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  private baseUrl = 'http://localhost:8080/api/application'
  // Subject to hold the state of job applications
  private jobApplicationSubject: BehaviorSubject<IJobApplicationForm[]> = new BehaviorSubject<IJobApplicationForm[]>([])
  private singleJobApplicationSubject:BehaviorSubject<any> = new BehaviorSubject(null)

  //Observable for components to subscribe to job application changes
  public jobApplications$: Observable<IJobApplicationForm[]> = this.jobApplicationSubject.asObservable()
  public singleJobApplication$:Observable<any> = this.singleJobApplicationSubject.asObservable()


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

  createJobApplication(jobApplicationData: IJobApplicationForm): Observable<any> {
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
     this.http.get<IJobApplicationForm[]>(`${this.baseUrl}/all-job-application`,{
       headers:{
         "Authorization":`Bearer ${token}`
       }
     }).subscribe((jobApplications) =>{
       this.jobApplicationSubject.next(jobApplications)
     })

  }

  fetchSingleJobApplication(jobId:string):void{
    const token = this.fetchToken();
    this.http.get(`${this.baseUrl}/singleJob/${jobId}`,{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    }).subscribe((singleJob) =>{
      this.singleJobApplicationSubject.next(singleJob)
    })
  }

  updateJobApplication(jobApplication:IUpdateJobApplication,jobId:number):Observable<IUpdateJobApplication>{
    const token = this.fetchToken()
    return this.http.put<IUpdateJobApplication>(`${this.baseUrl}/update/${jobId}`,jobApplication,{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    }).pipe(
      map((jobApplication:IUpdateJobApplication) =>{
        this.singleJobApplicationSubject.next(jobApplication)
        return jobApplication
      })
    )

  }



}
