import {Component, OnInit} from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';
import {JobApplicationService} from '../../services/job-application.service';
import {BaseChartDirective} from 'ng2-charts';
import {JobApplicationListComponent} from '../job-application-list/job-application-list.component';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {IJobApplicationForm} from '../../Interfaces/IJobApplicationForm';

@Component({
  selector: 'app-job-status-pie-chart',
  imports: [
    BaseChartDirective,
    JobApplicationListComponent,
    NgIf,

  ],
  templateUrl: './job-status-pie-chart.component.html',
  styleUrl: './job-status-pie-chart.component.css'
})
export class JobStatusPieChartComponent implements OnInit{
  jobApplicationList:IJobApplicationForm[] = []
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  itemsPerPage = 5;
  currentPage = 1

  constructor(private jobApplicationService: JobApplicationService) {}

  get paginatedItem(){
    const startIndex = (this.currentPage -1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    return this.items.slice(startIndex,endIndex)
  }

  get totalPages(){
    return Math.ceil(this.items.length / this.itemsPerPage)
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

  pieChartLabels: string[] = [];
  pieChartData: ChartConfiguration['data'] = {
    datasets: [{
      data: []
    }]
  };
  pieChartType: ChartType = 'pie';
  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels:{
          font:{
            size: 15 // Adjust legend font size
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            // Display the label (job status name) instead of the raw value
            const label = context.label || '';

            // Calculate the percentage
            console.log( Math.ceil(this.items.length / this.itemsPerPage))
            console.log("Hello from the label ", context.dataset.data as number[])
            const value = context.raw as number;
            const total = (context.dataset.data as number[]).reduce((a,b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2)

            return `${label}: ${value} (${percentage}%)`;
          }
        },
         bodyFont:{
          size:16 // Adjust tooltip font size
         }
      }
    }
  };


  ngOnInit() {
    // Fetch initial data
    this.jobApplicationService.fetchJobStatusCounts();

    // Subscribe to changes in job status counts
    this.jobApplicationService.jobStatusCounts$.subscribe(data => {
      this.pieChartLabels = Object.keys(data);
      console.log(this.pieChartLabels)
      this.pieChartData = {
        labels: this.pieChartLabels,
        datasets: [{
          data: Object.values(data)
        }]
      };
    });

    this.jobApplicationService.jobApplications$.subscribe((data) =>{
      this.jobApplicationList = data
      console.log(this.jobApplicationList.length)
    })
  }



}
