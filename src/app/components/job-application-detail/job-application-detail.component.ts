import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JobApplicationService} from '../../services/job-application.service';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {IUpdateJobApplication} from '../../Interfaces/IUpdateJobApplication';

@Component({
  selector: 'app-job-application-detail',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './job-application-detail.component.html',
  styleUrl: './job-application-detail.component.css'
})
export class JobApplicationDetailComponent implements OnInit{
  singleJobApplication!:any
  jobId!:string;
  isEditing:boolean = false;
  jobApplicationForm!:FormGroup

  constructor(
    private route:ActivatedRoute,
    private jobApplicationService:JobApplicationService,
    private fb:FormBuilder,
    private router:Router
    ) {}

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id') || ""
      this.jobApplicationService.singleJobApplication$.subscribe((singleJob) => {
      this.singleJobApplication = singleJob;

      this.jobApplicationForm = this.fb.group({
        id:[this.singleJobApplication?.id],
        jobTitle:[this.singleJobApplication?.jobTitle],
        companyName:[this.singleJobApplication?.companyName],
        status:[this.singleJobApplication?.status]
      })
    })
    this.jobApplicationService.fetchSingleJobApplication(this.jobId)
    console.log(this.jobId)


  }

  onCancel():void{
    this.isEditing = false
  }

  onEditing():void{
    this.isEditing = true
  }

  onUpdate():void{
    if(this.jobApplicationForm.valid){
      const jobApplication:IUpdateJobApplication = this.jobApplicationForm.value
      this.jobApplicationService.updateJobApplication(jobApplication,Number(this.jobId)).subscribe({
        next:() =>{
          console.log("successfully Updated")
          // this.router.navigate("/application")
          this.isEditing = false
        },
        error:(err)=>{
          console.log(err)
      }
      })
      console.log(this.jobApplicationForm.value.jobTitle)
    }
  }

}
