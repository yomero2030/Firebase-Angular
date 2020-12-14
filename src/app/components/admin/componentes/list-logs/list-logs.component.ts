import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/services/auth.service';

@Component({
  selector: 'app-list-logs',
  templateUrl: './list-logs.component.html',
  styleUrls: ['./list-logs.component.scss'],
  providers: [AuthService],
})
export class ListLogsComponent implements OnInit {

  constructor(
    private authSvc: AuthService, private router: Router ) { }
  archLogs: any;
  ngOnInit(): void {
    this.pagValid();
    this.getArchivosLogs();
  }

  getArchivosLogs(){
    this.authSvc.GetAllArchivosLogs().subscribe(Response => {
      console.log(Response.log)
      this.archLogs = Response.log;
    
    })  
  }

  pagValid(){
    if(localStorage.getItem('rol') != 'admin'){
      this.router.navigate(['']);
    }
  }

}
