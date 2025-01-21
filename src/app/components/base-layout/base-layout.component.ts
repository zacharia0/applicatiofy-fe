import { Component } from '@angular/core';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from '../sidebar/sidebar.component';

@Component({
  selector: 'app-base-layout',
  imports: [
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.css'
})
export class BaseLayoutComponent {

}
