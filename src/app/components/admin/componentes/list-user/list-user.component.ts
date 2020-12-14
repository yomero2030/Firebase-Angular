import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/services/auth.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers : [AuthService],
})
export class ListUSerComponent implements OnInit {

constructor( private autService: AuthService, private router: Router) { }
users: any;
  ngOnInit(): void {
    this.pagValid();
    this.getAllUser();
  }

  getAllUser(){
    this.autService.getALLUsers().subscribe( Response => {
      console.log(Response)
      this.users  =Response.users;
    })
  }

  pagValid(){
    if(localStorage.getItem('rol') != 'admin'){
      this.router.navigate(['']);
    }
  }

}
