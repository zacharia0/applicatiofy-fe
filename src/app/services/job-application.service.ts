import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, filter, map, Observable} from 'rxjs';
import {IJobApplicationForm} from '../Interfaces/IJobApplicationForm';
import {IUpdateJobApplication} from '../Interfaces/IUpdateJobApplication';
import {JobStatus2} from '../Enums/JobStatus';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  private baseUrl = 'http://localhost:8080/api/application'
  // Subject to hold the state of job applications
  private jobApplicationSubject: BehaviorSubject<IJobApplicationForm[]> = new BehaviorSubject<IJobApplicationForm[]>([])

  // Subject to hold the state of single job application
  private singleJobApplicationSubject: BehaviorSubject<any> = new BehaviorSubject(null)

  // Subject to hold the state of job application statuses.
  private jobStatusCountsSubject: BehaviorSubject<{ [key: string]: number }> = new BehaviorSubject<{
    [key: string]: number
  }>({})

  //Observable for components to subscribe to job application changes
  public jobApplications$: Observable<IJobApplicationForm[]> = this.jobApplicationSubject.asObservable()
  public singleJobApplication$: Observable<any> = this.singleJobApplicationSubject.asObservable()
  public jobStatusCounts$ = this.jobStatusCountsSubject.asObservable();


  constructor(private http: HttpClient) {
  }

  fetchToken(): string {
    const userInfo = localStorage.getItem("currentUser")
    let currentUser
    if (typeof userInfo === 'string') {
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

  fetchAllJobApplication(): void {
    const token = this.fetchToken()
    this.http.get<IJobApplicationForm[]>(`${this.baseUrl}/all-job-application`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).subscribe((jobApplications) => {
      this.jobApplicationSubject.next(jobApplications)
    })

  }

  fetchSingleJobApplication(jobId: string): void {
    const token = this.fetchToken();
    this.http.get(`${this.baseUrl}/singleJob/${jobId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).subscribe((singleJob) => {
      this.singleJobApplicationSubject.next(singleJob)
    })
  }

  updateJobApplication(jobApplication: IUpdateJobApplication, jobId: number): Observable<IUpdateJobApplication> {
    const token = this.fetchToken()
    return this.http.put<IUpdateJobApplication>(`${this.baseUrl}/update/${jobId}`, jobApplication, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).pipe(
      map((jobApplication: IUpdateJobApplication) => {
        this.singleJobApplicationSubject.next(jobApplication)
        return jobApplication
      })
    )

  }

  deleteJobApplication(jobId: number): Observable<any> {
    const token = this.fetchToken()
    console.log(token)
    return this.http.delete(`${this.baseUrl}/delete/${jobId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).pipe(map((deletedJob) => {
      console.log(deletedJob)
      const currentJobApplications = this.jobApplicationSubject.value
      const updatedJobApplication = currentJobApplications.filter((job) => job.id !== jobId)
      this.jobApplicationSubject.next(updatedJobApplication)
      return deletedJob
    }))
  }


  fetchJobStatusCounts(): void {
    const token = this.fetchToken()
    this.http.get<{ [key: string]: number }>(`${this.baseUrl}/jobStatus`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).subscribe({
      next: (data) => {
        console.log(data)
        const transformData = this.transformData(data)
        console.log(transformData)
        this.jobStatusCountsSubject.next(transformData);
      },
      error: (err) => {
        console.error('Failed to fetch job status counts:', err);
      }
    });
  }

  // An object where the keys are strings, and the values are numbers: data: { [key: string]: number }
  private transformData(data: { [key: string]: number }): { [key: string]: number } {
    const transformedData: { [key: string]: number } = {};

    for (const [key, value] of Object.entries(data)) {
      // Map backend keys to user-friendly labels using the JobStatus enum
      const userFriendlyKey = JobStatus2[key as keyof typeof JobStatus2];
      transformedData[userFriendlyKey] = value;
    }

    return transformedData;
  }

}
