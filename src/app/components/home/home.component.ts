import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AuthService],
  changeDetection : ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {

  constructor( private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

}
