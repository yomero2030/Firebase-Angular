import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  username: string;
  contador: number =0;
  bandera: boolean = true;

  loginForm  = new FormGroup({
    email: new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
  });
 
  constructor(
    private authSvc: AuthService,
    private router: Router ) {
   
    this.username = localStorage.getItem('userNames')
  }

  ngOnInit(): void {
  }

  //login firebase 
  async onInicio(){
    const { email, password } = this.loginForm.value;

    try {
      const user = await this.authSvc.login(email, password);
      if (user && user.user.emailVerified) {
        // redirect to home page
        this.router.navigate(['/home']);

      } else if (user) {
        this.router.navigate(['/verification-email']);
      }
      
    } catch (error) {
      console.log(error);
      
    }

  }


async onLoginAPi(loginForm: any){
      const loginUser = this.loginForm.value;
        await this.authSvc.LoginApi(loginUser).subscribe((newlogincreate) => {
          console.log(newlogincreate.user.id, newlogincreate.token);
          if(newlogincreate){
            Swal.fire({
              icon: 'success',
              title: 'Yes!',
              text: 'Inicio de sesión exitoso!',
            })
            localStorage.setItem('userNames', newlogincreate.user.name)
            localStorage.setItem('id.user', newlogincreate.user.id)
            localStorage.setItem('token', newlogincreate.token)
            localStorage.setItem('rol', newlogincreate.user.rol)
            localStorage.setItem('isLog', '1')
           // const rolsd = 
              const archLog = {
                  userId: newlogincreate.user.id,
                  rols: newlogincreate.user.rol,
                  userName: newlogincreate.user.name,
                  formaInicio: 'correo Electronico',
                  status: 'Exitoso',
                  actividad: 'Inicio de sesion',
                // actividad: 'inicioSesion cpo ' 
                    }
              //ENviar Logs ´por inicio de sesion
              this.authSvc.ArchivosLogs(archLog).subscribe( response => {
                if (response) {
                  console.log('log creado', response)
                   }
                }, err => {
                        console.log(err)
                             } )
                            this.router.navigate(['/home']);
                            console.log("nombre", this.username);
                            this.ngOnInit();
          }

        },
          err => {
            console.log("Error sesion")
            //this.contador = this.contador + 1;
            if (this.contador> 2) {
             this.contador = this.contador + 1;
                  Swal.fire({
                    icon: 'error',
                    title: 'Error Revise correo...',
                    text: 'Vaya vaya!',
                    timer: 800000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                  });
                 // this.contador = this.contador + 1;
                 console.log("contador if1: " + this.contador)
                  
                 console.log("error");
                 const email2 = { email: loginUser.email }
                 this.authSvc.EnviarEmaiIntentos(email2).subscribe(
                   response => {
                     console.log(response)
                   },
                   err => {
                     console.log(err)
                   }
                 )
                 this.bandera = false;
              
              } else { 
              this.contador= this.contador +1 
                
              

                if( this.contador == 1 ){
                  Swal.fire({
                    icon: 'error',
                    title: 'primer intento',
                    text: 'Email o contraseña incorrectos!',
                    });
                }
                if ( this.contador == 2){
                  Swal.fire({
                    icon: 'error',
                    title: 'segundo Intento',
                    text: 'Email o contraseña incorrectos!',
                    });
                }
                if ( this.contador == 3){
                  Swal.fire({
                    icon: 'error',
                    title: 'Tercer Intento',
                    text: 'Email o contraseña incorrectos!',
                    });
                }

              }

          })  //error)

          console.log("contador" + this.contador)
  }






  async onGitHub() {
    try {
      await this.authSvc.loginGit();
      this.router.navigate(['/home']);
    } catch (error) {
    }
  }

  async onFacebookLogin() {
    try {
      await this.authSvc.loginFacebook();
      this.router.navigate(['/home']);
    } catch (error) {

    }
  }

  async onGoogleLogin() {
    try {
      await this.authSvc.loginGoogle();
      this.router.navigate(['/home']);
    } catch (error) {

    }
  }


}
