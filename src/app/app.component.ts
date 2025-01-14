import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SignupComponent} from './components/signup/signup.component';
import {SignInComponent} from './components/sign-in/sign-in.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignupComponent, SignInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title:string = 'applicatiofy-fe';
  titles = "Does this work?"
}
