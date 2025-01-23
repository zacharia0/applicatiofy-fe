import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../Interfaces/IUser';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  currentUser!:User | null
  constructor(private authService:AuthService,private userService:UserService,private router:Router) {


  }

  ngOnInit() {
    this.authService.currentUser.subscribe({
      next:(user) =>{
        this.currentUser = user
      }
    })
  }

  onUpdate():void {

    this.router.navigate(['/update-user'])

  }

  onDelete():void{
    if(this.currentUser?.username){
      this.userService.delete(this.currentUser?.username).subscribe({
        next:() =>{
          console.log("Successfully Deleted")
        },
        error:(err) =>{
          console.log(err)
        }
      })
      console.log("Deleted " + this.currentUser.username)
      this.router.navigate(['/login'])

    }

  }

  user():void{
    console.log(this.currentUser)

  }
}
