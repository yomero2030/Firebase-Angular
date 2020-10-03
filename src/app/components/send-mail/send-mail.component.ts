import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss'],
  providers: [AuthService],
})
export class SendMailComponent{
  public user$ : Observable<any> = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService) { }



  onSendEmail(): void {
    this.authSvc.sendVerificationEmail();
  }

}
