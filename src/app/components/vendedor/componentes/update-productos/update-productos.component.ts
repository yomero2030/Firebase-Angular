import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/services/auth.service';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-productos',
  templateUrl: './update-productos.component.html',
  styleUrls: ['./update-productos.component.scss'],
  providers: [AuthService],
})
export class UpdateProductosComponent implements OnInit  {
  //formProducts: FormGroup = new FormGroup({});
  registroForm: FormGroup = new FormGroup({});
  constructor(private authServ: AuthService, private fb: FormBuilder, private router:Router) 
  { 
    this.registroForm = fb.group({
      nombre: [''],
      categoria: [''],
      precio: [''],
      imagen: [''],
      descripcion: [''],
      idUser: localStorage.getItem('id.user'),
    })
}

products: any;
public idProducto: any;    
 

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

  EliminarProducto(id: any){
    console.log("error")
    console.log(id)
    this.authServ.DeleteProducto(id).subscribe( Response =>{
      console.log(Response)
      //location.reload()
    })

    const archLog = {
      userId: localStorage.getItem('id.user'),
      rols: localStorage.getItem('rol'),
      userName: localStorage.getItem('userNames'),
      formaInicio: 'correo Electronico',
      status: 'exitoso',
      actividad: 'Elimino Producto',
    // actividad: 'inicioSesion cpo ' 
        }

    this.authServ.ArchivosLogs(archLog).subscribe( Response => {
      if(Response){
        console.log('log creado', Response)
      }
    })

    location.reload()
  }

  EditarProducto(id: any){
    console.log(id)
    this.idProducto = id; 
    console.log(this.idProducto)
   
  }


  EnviarProducto(registroForm:any){
    try {
            console.log(registroForm.get('nombre').value)
            let persona = { 
              nombre: registroForm.get('nombre').value, 
              categoria: registroForm.get('categoria').value,
              precio:  registroForm.get('precio').value,
              imagen:  registroForm.get('imagen').value,
              descripcion:  registroForm.get('descripcion').value,
            /// idUser: localStorage.getItem('idUser')
             } 
             console.log(persona)
      const upate =  ( this.authServ.EditarProductos(this.idProducto,persona)).subscribe(Response =>{
        if(upate){
          Swal.fire({
            icon: 'success',
            title: 'yes!',
            text: 'Actualizado exitoso Producto Correcto'
          });
        }
        const archLog = {
          userId: localStorage.getItem('id.user'),
          rols: localStorage.getItem('rol'),
          userName: localStorage.getItem('userNames'),
          formaInicio: 'correo Electronico',
          status: 'exitoso',
          actividad: 'Edito Producto',
        // actividad: 'inicioSesion cpo ' 
            }

            this.authServ.ArchivosLogs(archLog).subscribe( response =>{
              if (response) {
                console.log('log creado', response)
                 }
            })

        console.log("hola"+Response)
      })
      location.reload()

    } catch (error) {
      
    }
  }


  pagValid(){
    if(localStorage.getItem('rol') != 'vendedor'){
      this.router.navigate(['']);
    }
  }


}
