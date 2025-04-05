import { CanActivateFn } from '@angular/router';

export const homeGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
