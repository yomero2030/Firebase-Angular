
import {  Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , FormBuilder, Validators, AbstractControl,
          ValidationErrors, ValidatorFn} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService } from './../services/auth.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [AuthService]
})
export class RegistroComponent implements OnInit {
   formApi : FormGroup = new FormGroup({});

    registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(' ', [Validators.minLength(8)]),
    });

  constructor(private authSvc:AuthService, private router: Router,private formBuilder : FormBuilder  ) {

        this.formApi = this.formBuilder.group({
         name : ['', [Validators.required]],
         last_name: ['', [Validators.required]],
         email: ['', Validators.compose([Validators.required , Validators.email])],
         rol: ['',[Validators.required]],
         confirmPassword: ['',[Validators.required]],
         password: ['',Validators.compose([
           Validators.required, 
           Validators.minLength(8),
           Validators.maxLength(11),
           RegistroComponent.patternValidator(/\d/, { numero: true }),
           RegistroComponent.patternValidator(/[A-Z]/, { mayuscula: true }),
           RegistroComponent.patternValidator(/[a-z]/, { minuscula: true }),
           RegistroComponent.patternValidator(/[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g, { caracter: true })
         ]
         )]
        } ,
         {validators: this.Validarpassword('password', 'confirmPassword')}
        ) 
     }


    ngOnInit() {
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

  //Formularios Reactivos Formulario APiREst 
 async saveUser(formApi: any){
    event.preventDefault();
      const User = this.formApi.value;
      await (await this.authSvc.createUSerApi(User))
      .subscribe((newUserCreate) =>{
        const rol2 = User.nombre;
      //  console.log(newUserCreate.User.rol);
        const email = {email: newUserCreate['user'].email};
        const nombre = {name: newUserCreate['user'].name};
        const rol = {rol: newUserCreate['user'].rol};
        const  id = {id: newUserCreate['user'].id};
        this.authSvc.EnviarEmailsRegistro(email).subscribe(Response =>{
          console.log(Response)
        },
           err =>{
                console.log(err)
                console.log(rol2)
           }        
        )
         //  console.log(rol2)
        const archLog = {
          userId: '----' ,
          rols: '----',
          userName: '-------',
          formaInicio: 'correo Electronico',
          status: 'exitoso',
          actividad: 'creo cuenta',
            }
            this.authSvc.ArchivosLogs(archLog).subscribe( response => {
              if (response) {
                console.log('log creado', response)
                Swal.fire({
                  icon: 'success',
                  title: 'yes!',
                  text: 'Actualizado exitoso Producto Correcto'
               });
      
                 }
              }, err => {
                      console.log(err)
                           } )

        this.router.navigate(['/login']);
      })



    
  }

get f(){
  return this.formApi.controls;
}


  Validarpassword(password: string, confirmPassword: string){
    return (formApi: FormGroup) => {
      const pass= formApi.controls[password];
      const pasnew = formApi.controls[confirmPassword];
      if(pasnew.errors && !pasnew.errors.validarpassword){
        return;
      }
      if(pass.value !== pasnew.value){
        pasnew.setErrors({validarpassword: true});
      } else {
        pasnew.setErrors(null);
      }
    }
  }
  
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (pass: AbstractControl): { [key: string]: any } => {
      if (!pass.value) {
        // if pass is empty return no error
        return null;
      }
  
      // test the value of the pass against the regexp supplied
      const valid = regex.test(pass.value);
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

/*  ValidaRoles(rol){

  }*/


  avisoPriv(){

    this.router.navigate(['/avisoPrivacidad']);
  }


}
