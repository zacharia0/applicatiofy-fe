import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SignupComponent} from './components/signup/signup.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {AuthService} from './services/auth.service';
import {NgIf} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {User} from './Interfaces/UserInterface';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignupComponent, SignInComponent, NgIf, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title:string = 'applicatiofy-fe';
  titles = "Does this work?"
  currentUser!: User | null

  private destroy$ = new Subject<void>()
  constructor(private authService:AuthService) {


  }

  ngOnInit() {
    this.authService.currentUser.pipe(takeUntil(this.destroy$)).subscribe({
      next:(user) =>{
        this.currentUser = user
      },
      error:(err)=>{
        console.error("ERROR FETCHING USER" + err)
      }
    })
    console.log("Inside the app.js init")

  }
}
