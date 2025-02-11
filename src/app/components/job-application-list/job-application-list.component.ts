import {Component, OnInit} from '@angular/core';
import {JobApplicationService} from '../../services/job-application.service';
import {IJobApplicationForm} from '../../Interfaces/IJobApplicationForm';
import {NgClass, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {faTrashCan,faEye} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-job-application-list',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    FaIconComponent,
    NgClass,
    TitleCasePipe
  ],
  templateUrl: './job-application-list.component.html',
  styleUrl: './job-application-list.component.css'
})
export class JobApplicationListComponent implements OnInit{

  // ICONS
  faTrashCan = faTrashCan
  faEye = faEye


  itemsPerPage = 5
  currentPage = 1

  jobApplicationList!:IJobApplicationForm[]
  constructor(private jobApplicationService:JobApplicationService) {
  }

  get PaginatedItem(){
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
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





  ngOnInit() {
    this.jobApplicationService.jobApplications$.subscribe({
      next:(jobList) =>{
        this.jobApplicationList = jobList
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this.jobApplicationService.fetchAllJobApplication()

    console.log(this.jobApplicationList.slice())
  }


  onDelete(id:number):void{
    Notiflix.Confirm.show(
      'Confirm Job Deletion',
      'Warning! Do you want to delete this job?',
      'Delete',
      'Cancel',
      () => {
        this.jobApplicationService.deleteJobApplication(id).subscribe({
          next:() =>{
            console.log("Job Deleted")
            Notiflix.Notify.success("Job successfully deleted.")
          },
          error:(err) =>{
            Notiflix.Notify.failure("There was an error deleting this job!")
          }
        })
      },

      () =>{
        console.log("User canceled Deletion.")
        Notiflix.Notify.info("Job deletion canceled.")
      },
      {
        width:'320px',
        borderRadius: "8px",
        titleColor:'#ff0000',
        okButtonBackground:'#ff0000'
      }

    );


  }

}
