import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const authService = inject(AuthService);
  const authToken = authService.getToken();

  if (authToken) {
    const modifiedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
  
    return next(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 500 || error.status === 0){  //add condition checking if the refresh token has expired and then store the new access token in local storage
          const decodedToken = authService.getDecodedToken();
          const isExpired = decodedToken && decodedToken.exp ? (decodedToken.exp < Date.now() / 1000) : false;
          if(isExpired){
            const isRefresh = confirm("Your session has expired. Do you want to continue?");
            if(isRefresh){
              authService.getRefreshToken().subscribe({
                next: () => {  
                  // Trigger any additional logic or re-try the failed request if needed
                  authService.$refreshToken.next(true);
                },
                error: (refreshError: string) => {
                  authService.onLogOut(); // Optionally, log out the user
                }
              });
            } else {
              authService.onLogOut(); 
            }
          }
        }
        return throwError(() => error);
      })
    );
  }

    return next(req);

};
