import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SignInComponent} from '../sign-in/sign-in.component';
import {AuthService} from '../../services/auth.service';
import {first} from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    NgIf,
    SignInComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signUpForm:FormGroup;
  message:string = ""

  constructor(private fb:FormBuilder,private authService:AuthService) {
    this.signUpForm = this.fb.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      username:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }

  onRegister():void{
    if(this.signUpForm.valid){
      const {firstName,lastName,username,password} = this.signUpForm.value
      this.authService.register(firstName,lastName,username,password).subscribe({
        next:()=>{
          this.message = "Registration Successful!"
          this.signUpForm.reset();
        },
        error:(error) =>{
          this.message = 'Error:' + (error.error.message || "Unable to register")
        }
      })
    }

  }

}
