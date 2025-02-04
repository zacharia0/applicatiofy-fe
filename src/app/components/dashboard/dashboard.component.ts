import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {BaseChartDirective} from 'ng2-charts';
import {JobStatusPieChartComponent} from '../job-status-pie-chart/job-status-pie-chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,

    JobStatusPieChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private authService:AuthService) {
  }

}
