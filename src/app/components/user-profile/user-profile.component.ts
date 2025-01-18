import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../Interfaces/UserInterface';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  currentUser:User | null
  constructor(private authService:AuthService) {
    this.currentUser = this.authService.currentUserValue

  }

  user():void{
    console.log(this.currentUser)
  }
}
