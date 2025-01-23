import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SignInComponent} from '../sign-in/sign-in.component';
import {AuthService} from '../../services/auth.service';
import {first, Subject, takeUntil} from 'rxjs';
import {Router, RouterLink} from '@angular/router';
import {IRegister} from '../../Interfaces/IRegister';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,

  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  signUpForm:FormGroup;
  message:string = ""
  private destroy$ = new Subject<void>()

  constructor(private fb:FormBuilder,private authService:AuthService, private router:Router) {
    this.signUpForm = this.fb.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      username:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }





  ngOnInit():void{
    this.signUpForm.reset()
  }



  onRegister():void{
    if(this.signUpForm.valid){
      const registerData:IRegister = this.signUpForm.value

      this.authService.register(registerData).pipe(takeUntil(this.destroy$)).subscribe({
        next:() =>{
          console.log("registered in successfully ")
          this.router.navigate(["/login"])
        },
        error:(err)=>{
          console.log(err)
          this.message = err.error.error || "Unable to register, please try again later"
        }
      })

    }

  }

}
