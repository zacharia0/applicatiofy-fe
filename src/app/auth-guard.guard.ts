import {CanActivateFn, Router} from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  //get a reference to the router
  const router = new Router()

  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem('currentUser');

  if(isAuthenticated)
  {
    return true;
  } else{
    router.navigate(["/login"])
    return false;
  }
};
