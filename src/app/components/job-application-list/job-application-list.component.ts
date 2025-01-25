import {Component, OnInit} from '@angular/core';
import {JobApplicationService} from '../../services/job-application.service';
import {IJobApplicationForm} from '../../Interfaces/IJobApplicationForm';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-job-application-list',
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './job-application-list.component.html',
  styleUrl: './job-application-list.component.css'
})
export class JobApplicationListComponent implements OnInit{
  jobApplicationList!:IJobApplicationForm[]
  constructor(private jobApplicationService:JobApplicationService) {
  }

  ngOnInit() {
    this.jobApplicationService.jobApplications$.subscribe({
      next:(jobList) =>{
        this.jobApplicationList = jobList
        console.log(this.jobApplicationList)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this.jobApplicationService.fetchAllJobApplication()
  }




}
