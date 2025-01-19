import {Routes} from '@angular/router';
import {SignupComponent} from './components/signup/signup.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {authGuardGuard} from './auth-guard.guard';
import {UpdateUserComponent} from './components/update-user/update-user.component';

export const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[authGuardGuard]},
  {path:'user-profile', component:UserProfileComponent, canActivate:[authGuardGuard]},
  {path:"update-user",component:UpdateUserComponent, canActivate:[authGuardGuard]},
  {path: '**', redirectTo: "signIn", pathMatch: 'full'}
];
