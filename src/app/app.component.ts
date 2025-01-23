import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {SignupComponent} from './components/signup/signup.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {AuthService} from './services/auth.service';
import {NgIf} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {User} from './Interfaces/IUser';
import {Subject, takeUntil} from 'rxjs';
import {SidebarComponent} from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title:string = 'applicatiofy-fe';
  titles = "Does this work?"
  currentUser!: User | null
  isSignInUpRoute = false

  private destroy$ = new Subject<void>()
  constructor(private authService:AuthService, private router:Router) {


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

    // Listen for route changes
    this.router.events.subscribe(() =>{
      // check if the current route is /signIn
      this.isSignInUpRoute = this.router.url === '/signIn' || this.router.url === "/signup"
    })
    console.log("Inside the app.js init")

  }
}
