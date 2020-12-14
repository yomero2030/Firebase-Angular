import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NavbarComponent implements OnInit {
  username : string;
  public isLogged : boolean = false;
  public user$: Observable<any> = this.authSvc.afAuth.user;
  public roll = localStorage.getItem('rol') ;
  constructor( 
    private ref : ChangeDetectorRef,
    private authSvc: AuthService, private router: Router,
  ) {
      
   }

 ngOnInit(){
   this.username= localStorage.getItem('userNames')
   this.isLogged = true;
   if(this.username===" "){
      console.log("vacio ")
   } else{
     this.isLogged = true;
   }

  }

 async onLogaut(){
    try {
      await this.authSvc.logou();
      localStorage.clear()
    this.router.navigate(['/login'])
    } catch (error) {
      console.log(error)
    }
  }

 async onLogautAPi(){
    localStorage.removeItem('userNames')
    this.isLogged = false;
    localStorage.removeItem('token')
    localStorage.removeItem('id.user')
    localStorage.removeItem('rol')
    this.router.navigate(['/login'])
  }

}
