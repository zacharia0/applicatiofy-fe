import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {JobApplicationService} from '../../services/job-application.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {JobStatus, JobStatus2} from '../../Enums/JobStatus';
import {faTrashCan,faPen,faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-job-application-detail',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './job-application-detail.component.html',
  styleUrl: './job-application-detail.component.css'
})
export class JobApplicationDetailComponent implements OnInit {

  jobStatusOptions = Object.values(JobStatus)
  // ICONS
  faTrashCan = faTrashCan
  faPen = faPen
  faArrowLeft =faArrowLeft



  singleJobApplication!: any
  jobId!: string;
  isEditing: boolean = false;
  jobApplicationForm!: FormGroup
  // jobStatusOptions = Object.values(JobStatus)

  // jobStatusLabel : {key:string,value:string}[] = this.getJobStatusOptions()

  constructor(
    private route: ActivatedRoute,
    private jobApplicationService: JobApplicationService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    console.log(JobStatus)
    this.jobId = this.route.snapshot.paramMap.get('id') || ""

    this.jobApplicationService.fetchSingleJobApplication(this.jobId)

    this.jobApplicationService.singleJobApplication$.subscribe((singleJob) => {
      if(singleJob){
        this.singleJobApplication = singleJob;
      }

      console.log(this.singleJobApplication?.status)
      this.jobApplicationForm = this.fb.group({
        id: [this.singleJobApplication?.id],
        jobTitle: [this.singleJobApplication?.jobTitle],
        companyName: [this.singleJobApplication?.companyName],
        status: [this.singleJobApplication?.status],
        appliedDate:[this.singleJobApplication?.appliedDate],
        interviewDate:[this.singleJobApplication?.interviewDate],
        applicationLink:[this.singleJobApplication?.applicationLink],
        recruiterName:[this.singleJobApplication?.recruiterName],
        recruiterContact:[this.singleJobApplication?.recruiterContact]
      })
    })
  }

  onCancel(): void {
    this.isEditing = false
  }

  onEditing(): void {
    this.isEditing = true
  }

  onUpdate(): void {
    if (this.jobApplicationForm.valid) {


      const jobApplication  = this.jobApplicationForm.value

      this.jobApplicationService.updateJobApplication(jobApplication, Number(this.jobId)).subscribe({
        next: () => {
          console.log("successfully Updated")
          // this.router.navigate("/application")
          this.isEditing = false
          Notiflix.Notify.success("Successfully updated.")
        },
        error: (err) => {
          console.log(err)
        }
      })
      console.log(this.jobApplicationForm.value.jobTitle)
    }
  }

  onDelete(): void {
    this.jobApplicationService.deleteJobApplication(Number(this.jobId)).subscribe({
      next: (data) => {
        Notiflix.Notify.success("Successfully deleted.")
        console.log(data)
        this.router.navigate(["/application-list"])
        console.log("Getting Notiflix ready...")

      },
      error: (err) => {
        console.warn(err)
      }
    })
  }


  getJobStatusOptions():{key:string, value:string}[] {
    return Object.keys(JobStatus2).map(key =>({
      key:key,
      value: JobStatus2[key as keyof typeof JobStatus2]
    }))


  }







}
