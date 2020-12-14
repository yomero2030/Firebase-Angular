import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/components/services/auth.service';
import { FormGroup, FormControl, Validator, FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-products',
  templateUrl: './registro-products.component.html',
  styleUrls: ['./registro-products.component.scss'],
  providers: [AuthService]
})
export class RegistroProductsComponent implements OnInit {
  formProducts: FormGroup = new FormGroup({});

  constructor(private authServ:AuthService, private router: Router,
     private formBuilder: FormBuilder ) 
     {
      this.formProducts = this.formBuilder.group({
        nombre: ['',[Validators.required]],
        categoria: ['',[Validators.required]],
        precio: ['',[Validators.required]],
        imagen: [''],
        descripcion: [' ',[Validators.required]],
        idUser: '2',
      })


      }

  ngOnInit(): void {
    this.pagValid()
    console.log(localStorage.getItem('rol'))
  }

 async guardarProductos(formProducts: any){
    try {
        const RegistroProducto = await(await this.authServ.regsitroPrducto(formProducts)).subscribe(Response=>{
          if(RegistroProducto){
            Swal.fire({
              icon: 'success',
              title: 'yes!',
              text: 'Registro Producto Correcto'
            });


          }
        })  
          const arcHlogs ={
                  userId: '2',
                  rols:'vendedor',
                  userName: Response.name,
                  formaInicio: 'correo Electronico',
                  status: 'Exitoso',
                  actividad: 'creo un producto ',
          }
          this.authServ.ArchivosLogs(arcHlogs).subscribe(Response  => {
            if(Response){
              console.log("logs Creado", Response)
            }
          })
      

    } catch (error) {
      

    }
  }


  pagValid(){
    if(localStorage.getItem('rol') != 'vendedor'){
      this.router.navigate(['']);
    }
  }

}
