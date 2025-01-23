import {Routes} from '@angular/router';
import {SignupComponent} from './components/signup/signup.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {authGuardGuard} from './auth-guard.guard';
import {UpdateUserComponent} from './components/update-user/update-user.component';
import {JobApplicationFormComponent} from './components/job-application-form/job-application-form.component';
import {JobApplicationListComponent} from './components/job-application-list/job-application-list.component';
import {BaseLayoutComponent} from './components/base-layout/base-layout.component';
import {JobApplicationDetailComponent} from './components/job-application-detail/job-application-detail.component';

export const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'signIn', component: SignInComponent},

  {
    path: '',
    component: BaseLayoutComponent, // parent component for authenticated routes
    canActivate: [authGuardGuard],
    children: [

      {path: 'dashboard', component: DashboardComponent},
      {path: 'user-profile', component: UserProfileComponent},
      {path: "update-user", component: UpdateUserComponent},
      {path: 'create-job', component: JobApplicationFormComponent},
      {path: 'application-list', component: JobApplicationListComponent},
      {path:'application-detail/:id',component:JobApplicationDetailComponent}
    ],

  },

  {path: '**', redirectTo: "signIn", pathMatch: 'full'}
];
