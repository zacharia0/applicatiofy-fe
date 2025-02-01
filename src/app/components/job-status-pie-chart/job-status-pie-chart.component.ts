import {Component, OnInit} from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';
import {JobApplicationService} from '../../services/job-application.service';
import {BaseChartDirective} from 'ng2-charts';
import {JobApplicationListComponent} from '../job-application-list/job-application-list.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-job-status-pie-chart',
  imports: [
    BaseChartDirective,
    JobApplicationListComponent,

  ],
  templateUrl: './job-status-pie-chart.component.html',
  styleUrl: './job-status-pie-chart.component.css'
})
export class JobStatusPieChartComponent implements OnInit{
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  itemsPerPage = 5;
  currentPage = 1

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
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            // Display the label (job status name) instead of the raw value
            const label = context.label || '';

            // Calculate the percentage
            console.log( Math.ceil(this.items.length / this.itemsPerPage))
            console.log("Hellow from the label ", context.dataset.data as number[])
            const value = context.raw as number;
            const total = (context.dataset.data as number[]).reduce((a,b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2)

            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  constructor(private jobApplicationService: JobApplicationService) {}

  ngOnInit() {
    // Fetch initial data
    this.jobApplicationService.fetchJobStatusCounts();

    // Subscribe to changes in job status counts
    this.jobApplicationService.jobStatusCounts$.subscribe(data => {
      console.log(Object.keys(data))
      this.pieChartLabels = Object.keys(data);
      this.pieChartData = {
        labels: this.pieChartLabels,
        datasets: [{
          data: Object.values(data)
        }]
      };
    });
  }

}
