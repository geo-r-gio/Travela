import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { SnackbarService } from '@shared/services/snackbar/snackbar.service';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let errorMessage = 'An unknown error has occurred';
      const errorDetail = err.error?.Message?.[0];

      if (err.status === 500 && errorDetail.includes("Call failed with status code 409")) {
        errorMessage = 'Email already exists';
      } else if (err.status === 401) {
        errorMessage = 'The provided credentials are not correct';
      } else if(authToken) {
        if(err.status === 500 || err.status === 0){  //add condition checking if the refresh token has expired and then store the new access token in local storage
          const decodedToken = authService.getDecodedToken();
          const isExpired = decodedToken && decodedToken.exp ? (decodedToken.exp < Date.now() / 1000) : false;
          console.log(isExpired);
          if(isExpired){
            const isRefresh = confirm("Your session has expired. Do you want to continue?");
            if(isRefresh){
              authService.getRefreshToken().subscribe({
                next: () => {  
                  authService.$refreshToken.next(true);
                },
                error: (refreshError: string) => {
                  console.error(refreshError);
                  authService.onLogOut();
                }
              });
            } else {
              authService.onLogOut(); 
            }
          }
        }
      }

      return throwError(() => errorMessage);
    })
  );
};
