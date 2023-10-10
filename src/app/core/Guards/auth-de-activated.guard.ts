import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authDeActivatedGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
  // if localStorage have token that mean user made login , y3ny m4 hwdeeh 3la al login aw al sign up hwdeeh 3la ay url tani ex: home
  if (localStorage.getItem('userToken')) {
    _router.navigate(['/home']);
    return false;
  } 
  // user go to sign in or sign up because localStorage does not contain token 
  else {
    return true;  // allowed the user to go to the url where he wrote it
  }
};
