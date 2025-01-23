import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from '../../services/auth.service';
import {User} from '../../Interfaces/IUser';

@Component({
  selector: 'app-sidebar',
    imports: [
        RouterLink
    ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  currentUser!:User
  constructor(private authService:AuthService) {
  }

  ngOnInit() {
    this.authService.currentUser.subscribe({
      next:(user) =>{
        if(user){
          this.currentUser = user
        }
      }
    })
  }

  onLogout():void{
    this.authService.logOut()
  }

}
