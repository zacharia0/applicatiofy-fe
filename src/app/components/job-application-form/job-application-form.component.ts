import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {IJobApplicationAccount} from '../../Interfaces/IJobApplicationAccount';
import {JobApplicationService} from '../../services/job-application.service';
import {JobStatus, JobStatus2, JobStatusMapping} from '../../Enums/JobStatus';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-job-application-form',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './job-application-form.component.html',
  styleUrl: './job-application-form.component.css'
})
export class JobApplicationFormComponent implements OnInit {

  applicationForm!: FormGroup
  account!: IJobApplicationAccount

  jobStatusOptions = Object.values(JobStatus)
  // jobStatusOptions2:{key:string,value:string}[] = this.getJobStatusOption()

  constructor(private fb: FormBuilder, private authService: AuthService, private jobApplicationService:JobApplicationService) {


  }

  ngOnInit() {
    this.authService.currentUser.subscribe({
      next: (user) => {
        if (user) {
          this.account = {
            id: user?.id,
            username: user?.username,
            firstName: user?.firstName,
            lastName: user?.lastName
          }
        }
        this.initializeForm(this.account)


      },
      error: (err) => {
        console.log("Error inside the job-application-form" + err)
      }
    })
  }

  initializeForm(account: IJobApplicationAccount): void {
    this.applicationForm = this.fb.group({
      jobTitle: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      appliedDate: [''],
      interviewDate: ['', ],
      applicationMethod: ['', ],
      status: [JobStatus.APPLIED],
      applicationLink: ['', ],
      recruiterName: ['', ],
      recruiterContact: ['', ],
      notes: ['', ],
      account: [account]

    })
  }

  onSubmitForm():void{
    if(this.applicationForm.valid){
      const formValue = this.applicationForm.value

      console.log("******" + formValue)
      //Map the selected status to the backend-compatible value
      const backendCompatibleStatus = JobStatusMapping[formValue.status];

      //Create the payload with the backend-compatible status
      const jobApplicationData = {
        ...formValue,
        status:backendCompatibleStatus
      }

      this.jobApplicationService.createJobApplication(jobApplicationData).subscribe({
        next:()=>{
          console.log("Successfully Submitted job application.")
          this.applicationForm.reset({
            jobTitle: '',
            companyName: '',
            applicationDate: '',
            interviewDate: '',
            applicationMethod: '',
            status: JobStatus.APPLIED,
            applicationLink: '',
            recruiterName: '',
            recruiterContact: '',
            notes: '',
            // account:{}
          })
          Notiflix.Notify.success("Successfully added new job.")

        },
        error:(err) =>{
          console.log(err)
        }
      })
    }
  }


  getJobStatusOption():{key:string,value:string}[]{
    return Object.keys(JobStatus2).map(key =>({
      key:key,
      value:JobStatus2[key as keyof typeof JobStatus]
    }))
  }


  protected readonly JobStatus = JobStatus;
}
