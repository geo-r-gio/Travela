import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faGoogle, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

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
  
  constructor(private formBuilder : FormBuilder){}

  // loginForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  // });

  private createForm(){
    this.loginForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      authentication: ['', [Validators.required]]
    });
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  isFormValid() {
    if (this.isLoginMode) {
      return this.loginForm.get('email')?.valid && this.loginForm.get('password')?.valid && this.loginForm.get('authentication')?.valid;
    } else {
      return this.loginForm.valid;
    }
  }

  onSubmit() {
    if (this.isLoginMode) {
      // Handle login
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        authentication: this.loginForm.value.authentication
      };
      console.log('Login Data:', loginData);
    } else {
      // Handle signup
      const signupData = this.loginForm.value;
      console.log('Signup Data:', signupData);
    }
  }

  ngOnInit(){
    this.createForm();
  }

}
