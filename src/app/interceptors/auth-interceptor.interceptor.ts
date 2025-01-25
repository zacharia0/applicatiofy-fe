import { HttpInterceptorFn } from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  return next(req).pipe(
    catchError((error) =>{
      if(error.status === 401){
        // Token is expired or invalid, log out the user.
        authService.logOut()
        router.navigate(["/signIn"])
      }
      return throwError(() => error)
    })
  )
};
