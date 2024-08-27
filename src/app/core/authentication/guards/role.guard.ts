import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { SnackbarService } from '../../../shared/services/snackbar/snackbar.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const snackbarService = inject(SnackbarService);
  const router = inject(Router);

  if(authService.isAdmin()){
    return true;
  } else {
    snackbarService.show('You do not have access to this page.');
    router.navigate(['/countries/home']);
    return false;
  }
};
