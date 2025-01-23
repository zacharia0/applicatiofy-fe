import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {IJobApplicationAccount} from '../../Interfaces/IJobApplicationAccount';
import {User} from '../../Interfaces/IUser';
import {JobApplicationService} from '../../services/job-application.service';

@Component({
  selector: 'app-job-application-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './job-application-form.component.html',
  styleUrl: './job-application-form.component.css'
})
export class JobApplicationFormComponent implements OnInit {

  applicationForm!: FormGroup
  account!: IJobApplicationAccount

  constructor(private fb: FormBuilder, private authService: AuthService, private jobApplicationService:JobApplicationService) {


  }

  ngOnInit() {
    this.authService.currentUser.subscribe({
      next: (user) => {
        if (user) {
          this.account = {
            id: user?.id,
            username: user?.username,
            firstName: user.firstName,
            lastName: user.lastName
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
      applicationDate: [''],
      interviewDate: ['', ],
      applicationMethod: ['', ],
      status: ['',],
      applicationLink: ['', ],
      recruiterName: ['', ],
      recruiterContact: ['', ],
      notes: ['', ],
      account: [account]

    })
  }

  onSubmitForm():void{
    console.log("Dddddddddd")
    if(this.applicationForm.valid){
      const jobApplicationData = this.applicationForm.value

      this.jobApplicationService.createJobApplication(jobApplicationData).subscribe({
        next:()=>{
          console.log("Successfully Submitted job application.")
          this.applicationForm.reset({
            jobTitle: '',
            companyName: '',
            applicationDate: '',
            interviewDate: '',
            applicationMethod: '',
            status: '',
            applicationLink: '',
            recruiterName: '',
            recruiterContact: '',
            notes: '',
            // account:{}
          })
        },
        error:(err) =>{
          console.log(err)
        }
      })
    }
  }


}
