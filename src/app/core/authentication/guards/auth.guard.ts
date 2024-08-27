import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/authentication/services/auth.service';
import { inject } from '@angular/core';
import { SnackbarService } from '@shared/services/snackbar/snackbar.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const snackbarService = inject(SnackbarService);
  const router = inject(Router);

  if(authService.isLoggedIn()){
    return true;
  } else {
    snackbarService.show('You must be logged in to access this page.');
    router.navigate(['login'])
    return false;
  }
};
