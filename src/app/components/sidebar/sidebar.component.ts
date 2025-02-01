import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from '../../services/auth.service';
import {User} from '../../Interfaces/IUser';
import {NgClass, NgIf} from '@angular/common';
import {faBorderAll, faFolderClosed,faFolderPlus,faSliders,faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {FaDuotoneIconComponent, FaIconComponent,} from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-sidebar',
  imports: [
    NgClass,
    RouterLink,
    FaIconComponent,
    FaDuotoneIconComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  // Icons
  faBorderAll = faBorderAll
  faFolderClosed = faFolderClosed
  faFolderPlus = faFolderPlus
  faSliders = faSliders
  faRightFromBracket =faRightFromBracket

  @Input() isOpen = false

  // Toggle sidebar open/close
  toggleSidebar(){
    this.isOpen = !this.isOpen
  }


  currentUser!:User


  constructor(private authService:AuthService,private router:Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(() =>{
      if(window.innerWidth < 640){
        this.isOpen = false
      }
    })
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

  closeSidebar(){
    if(window.innerWidth < 640){
      this.isOpen = false
    }
  }

}
