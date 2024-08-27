import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { Login, Signup, Tokens, UserProfile } from '@shared/models/user.model';
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

  onSignUp(data: Signup){
    return this.http.post<Signup>(`${environment.baseUrl}SignUp()`, data);
  }

  onAdminSignUp(data: Signup){
    return this.http.post<Signup>(`${environment.baseUrl}CreateAdminUser()`, data);
  }

  onLogin(email: string, password: string, role: string){
    const data = {Username: email, Password: password, RoleName: role};
    return this.http.post<Login>(`${environment.baseUrl}Login()`, data);
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
      console.log(res.AccessToken);
      
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

  getProfile(): Observable<UserProfile>{
    return this.http.get<UserProfile>(`${environment.baseUrl}GetProfile()`);
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }
}
