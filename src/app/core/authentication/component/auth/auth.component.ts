import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faGoogle, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../../../shared/services/snackbar/snackbar.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  faGoogle = faGoogle;
  faGithub = faGithub;
  faFacebook = faFacebook;
  faArrowRightLong = faArrowRightLong;

  isLoginMode: Boolean = true;
  public loginForm! : FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  authObs!: Observable<any>;
  
  constructor(private formBuilder : FormBuilder, private authService : AuthService, 
    private snackbarService : SnackbarService, private router : Router){ }

  ngOnInit(){
    this.createForm();
    this.snackbarService.snackbarState
    .subscribe(message => {
      this.errorMessage = message;
      this.hideSnackbar(); 
    });
  }

  private createForm(){
    this.loginForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', [Validators.required]]
    });
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  isFormValid() {
    if (this.isLoginMode) {
      return this.loginForm.get('email')?.valid && this.loginForm.get('password')?.valid && this.loginForm.get('role')?.valid;
    } else {
      return this.loginForm.valid;
    }
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const role = this.loginForm.value.role;

    if (this.isLoginMode) {
      // Handle login
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        role: this.loginForm.value.role
      };
     
      this.authObs = this.authService.onLogin(email, password, role)
    } else {
      // Handle signup
      const signupData = this.loginForm.value;
      
      if (role === 'admin') {
        // Admin signup
        this.authObs = this.authService.onAdminSignUp(signupData);
      } else {
        // Regular user signup
        this.authObs = this.authService.onSignUp(signupData);
      }
    }

    this.authObs.subscribe({
      next: (res) => { 
        console.log(res) 
        if(!this.isLoginMode){
          let successMsg = 'Sign Up Successful! Please Login to Continue'
          this.successMessage = successMsg;
          this.isLoginMode = true;
        } else {
          let successMsg = 'Login Successful!'
          this.successMessage = successMsg;
          
          this.authService.storeToken(res.Login.AccessToken);
          this.authService.storeRefreshToken(res.Login.RefreshToken);
          this.router.navigate(['home']);
        }
        this.hideSnackbar();
      },
      error: (errMsg) => { 
        console.error(errMsg)
        this.errorMessage = errMsg;
        this.hideSnackbar();
      }
    });
    this.loginForm.reset();
  }

  hideSnackbar(){
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
    }, 3000);
  }

}
