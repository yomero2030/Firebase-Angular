import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor( private authSvc: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

async onGitHub(){

  try {
    await this.authSvc.loginGit();
    this.router.navigate(['/home']);
  } catch (error) {
    
  }
}


async onFacebookLogin(){
  try {
    await this.authSvc.loginFacebook();
    this.router.navigate(['/home']);
  } catch (error) {
    
  }
}

 async onGoogleLogin() {
      try {
       await this.authSvc.loginGoogle();
        this.router.navigate(['/home']);
      } catch (error) {
    
  }
  }

  async onInicio(){
    const { email, password} = this.loginForm.value;
    
    try {
      const user = await this.authSvc.login(email,password);
      if(user && user.user.emailVerified){
          // redirect to home page
           this.router.navigate(['/home']);
      }else if(user){
        this.router.navigate(['/verification-email']);
      }
    } catch (error) {
      console.log(error);
    }
    
  }

}
