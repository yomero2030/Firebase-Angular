import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService } from './../services/auth.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [AuthService]
})
export class RegistroComponent implements OnInit {
  registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
  });

  constructor(private authSvc:AuthService, private router: Router ) { }

  ngOnInit(): void {

  }

 async onRegistro(){
    const { email, password } = this.registerForm.value;
    try {
      const user = await this.authSvc.registro(email, password);
      if(user){
        //redirection
        this.router.navigate(['/verification-email']);

      }
    } catch (error) {
      
    }
    
   
  }

}
