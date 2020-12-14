import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/services/auth.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  providers: [AuthService],
})
export class ListProductsComponent implements OnInit {

  constructor(private authServ: AuthService, private router: Router) { }
  products: any;

  ngOnInit(): void {
    this.pagValid();
    this.traerProducts();
  }

  traerProducts(){
    this.authServ.listproducts().subscribe( Response =>{
      console.log(Response)
      this.products = Response.produc;
    })
  }

  pagValid(){
    if(localStorage.getItem('rol') != 'admin'){
      this.router.navigate(['']);
    }
  }

}
