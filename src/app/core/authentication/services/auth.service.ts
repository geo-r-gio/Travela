import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { login, signup, Tokens } from '@shared/models/user.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SnackbarService } from '@shared/services/snackbar/snackbar.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();

  public $refreshToken = new Subject<boolean>();
  public $refreshTokenReceived = new Subject<boolean>();

  constructor(private http : HttpClient, private router : Router, private snackbarService : SnackbarService) {
    this.$refreshToken.subscribe(() => {
      this.getRefreshToken();
    })
   }

  onSignUp(data: signup){
    return this.http.post<signup>(`${environment.baseUrl}SignUp()`, data).pipe(catchError(this.handleError));
  }

  onAdminSignUp(data: signup){
    return this.http.post<signup>(`${environment.baseUrl}CreateAdminUser()`, data).pipe(catchError(this.handleError));
  }

  onLogin(email: string, password: string, role: string){
    const data = {Username: email, Password: password, RoleName: role};
    return this.http.post<login>(`${environment.baseUrl}Login()`, data).pipe(catchError(this.handleError));
  }

  onLogOut(){
    localStorage.clear();
    this.snackbarService.clear();
    this.router.navigate(['login']);
  }

  getRefreshToken(): Observable<Tokens>{
    const token ={
      "RefreshToken": localStorage.getItem('refreshToken')
    }

    return this.http.post<Tokens>(`${environment.baseUrl}RefreshToken()`, token).pipe(tap((res) => {
      // Store the new tokens in localStorage
      localStorage.setItem('token', res.AccessToken);
      localStorage.setItem('refreshToken', res.RefreshToken);
      
      this.$refreshTokenReceived.next(true);
    }));
  }

  storeRefreshToken(refreshTokenValue: string){
    localStorage.setItem('refreshToken', refreshTokenValue);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue);
  }
 
  getToken(){
    return localStorage.getItem('token');
  }

  getDecodedToken(){
    const token = this.getToken()!;
    return this.jwtHelper.decodeToken(token);
  }

  isAdmin(): boolean {
    const decodedToken = this.getDecodedToken();
    return decodedToken?.realm_access?.roles.includes('Admin') || false;
  }

  getProfile(){
    return this.http.get(`${environment.baseUrl}GetProfile()`);
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  private handleError(err: any){
    let signupErrorMsg = 'Email already exists'
    let loginErrorMsg = 'The provided credentials are not correct'
    let unknownError = 'An unknown error has occurred'
    if(err.status === 500){
      return throwError(() => signupErrorMsg)
    } else if(err.status === 401){
      return throwError(() => loginErrorMsg)
    }
    return throwError(() => unknownError)
  }
}
