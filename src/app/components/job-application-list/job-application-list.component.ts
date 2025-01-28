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


  itemsPerPage = 5
  currentPage = 1

  get PaginatedItem(){
    const startIndex = (this.currentPage -1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    return this.jobApplicationList.slice(startIndex,endIndex)
  }

  get totalPages(){
    return Math.ceil(this.jobApplicationList.length / this.itemsPerPage)
  }

  goToPreviousPage(){
    if(this.currentPage > 1){
      this.currentPage--
    }
  }

  goToNextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage++
    }
  }



  jobApplicationList!:IJobApplicationForm[]
  // jobId!:number
  constructor(private jobApplicationService:JobApplicationService) {
  }

  ngOnInit() {
    this.jobApplicationService.jobApplications$.subscribe({
      next:(jobList) =>{
        this.jobApplicationList = jobList
        // this.jobId = jobList.id?
        // console.log(this.jobApplicationList)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this.jobApplicationService.fetchAllJobApplication()

    console.log(this.jobApplicationList.slice())
  }


  onDelete(id:number):void{
    this.jobApplicationService.deleteJobApplication(id).subscribe({
      next:() =>{
        console.log("Job Deleted")
      },
      error:(err) =>{
        console.warn(err)
      }
    })

  }


}
