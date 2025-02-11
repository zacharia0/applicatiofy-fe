import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../Interfaces/IUser';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import Notiflix from 'notiflix';

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

  // onDelete():void{
  //   if(this.currentUser?.username){
  //     this.userService.delete(this.currentUser?.username).subscribe({
  //       next:() =>{
  //         console.log("Successfully Deleted")
  //         this.authService.logOut()
  //         this.currentUser = null
  //         this.router.navigate(['/login'])
  //         Notiflix.Notify.failure("Successfully deleted user.")
  //
  //       },
  //       error:(err) =>{
  //         console.log(err)
  //       }
  //     })
  //     console.log("Deleted " + this.currentUser.username)
  //
  //
  //
  //   }
  // }


  onDelete(): void {
    Notiflix.Confirm.show(
      'Confirm Deletion', // Title of the confirmation dialog
      'Warning! Do you want to delete your profile?', // Message to display
      'Yes', // Text for the confirm button
      'No',  // Text for the cancel button
      () => { // Callback if the user confirms
        if (this.currentUser?.username) {
          this.userService.delete(this.currentUser?.username).subscribe({
            next: () => {
              console.log("Successfully Deleted");
              // Optionally show a notification
              Notiflix.Notify.success("Your profile has been successfully deleted.");
              this.authService.logOut();
              this.currentUser = null;
              this.router.navigate(['/login']);
            },
            error: (err) => {
              console.error(err);
              Notiflix.Notify.failure("There was an error deleting your profile.");
            }
          });
        }
      },
      () => { // Callback if the user cancels
        console.log("User canceled deletion");
        Notiflix.Notify.info("Profile deletion canceled.");
      },
      {
        // Optional styling/configuration options:
        width: '320px',
        borderRadius: '8px',
        titleColor: '#ff0000',
        okButtonBackground: '#ff0000'
      }
    );
  }

  user():void{
    console.log(this.currentUser)

  }
}
