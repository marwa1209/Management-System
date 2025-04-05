import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const homeGuard: CanActivateFn = (route, state) => {
 const router: Router = inject(Router);
  if (!localStorage.getItem('token')) return true;

  router.navigate(['/home']);
  return false;
};
