import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {ILogin} from '../../Interfaces/ILogin';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  signInForm:FormGroup
  message:string = ""
  private destroy$ = new Subject<void>()

  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router) {
    this.signInForm = this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }


  onLogin():void{
    if(this.signInForm.valid){
      const loginData:ILogin = this.signInForm.value
      this.authService.login(loginData).pipe(takeUntil(this.destroy$)).subscribe({
        next:() =>{
          console.log("Logged In success Fully")
          this.router.navigate(['/dashboard'])
        },
        error:(err) =>{
          console.log("error login in")
          this.message = err.error.error || "Unable to login at this moment, try again later."
        }
      })

    }
    console.log(this.signInForm.value.username)
    console.log(this.signInForm.value.password)
  }

}
