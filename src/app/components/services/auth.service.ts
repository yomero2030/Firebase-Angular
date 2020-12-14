import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import {first} from 'rxjs/operators';
import { auth} from 'firebase/app';

import { userCreate } from '../models/userCreate.models'
import { userLogin } from '../models/userLogin.models'

import {HttpClient , HttpHeaders}  from '@angular/common/http';

import { from, Observable } from 'rxjs';
@Injectable()
export class AuthService {

  public user: User;
  //private token: string;
  constructor(public afAuth: AngularFireAuth, 
    
    private http : HttpClient
    ) { }
    URL: string = "https://seguridadi.herokuapp.com";
    token: any;
    email: any ;

  
async sendVerificationEmail(): Promise<void>{
    return (await this.afAuth.currentUser).sendEmailVerification();
   }

async loginGit(){
  try {
    return this.afAuth.signInWithPopup(new auth.GithubAuthProvider());
  } catch (error) {
    
  }
}

async loginFacebook(){
  try {
    return this.afAuth.signInWithPopup(new auth.FacebookAuthProvider());
  } catch (error) {
    
  }
}

async loginGoogle(){
  try {
     return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (error) {
       
     }
   }
async login(email : string, password : string){

  try {
    const result = await this.afAuth.signInWithEmailAndPassword(
      email,
      password
    );
    return result;
  } catch (error) {
    console.log(error);
  }
  
  }

async registro(email : string, password : string){
   try {
    const result = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    this.sendVerificationEmail();
    return result;
   } catch (error) {
    console.log(error);
   }
  }

async logou(){
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
    
  }
  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();

  }

  //CONEXION RUTAS DE API

  //RUTAS DE USUSARIOS

  async createUSerApi(usercreate : userCreate){ //CREAR
    try { 
        return  await this.http.post(this.URL+'/register', usercreate)
    }  catch (error){
      console.log(error);
    }

  }
  //traer todos los usuarios
  getALLUsers(): Observable<any>{
    try {
      return   this.http.get<any>(this.URL+'/admin/allUser');
    } catch (error) {
      console.log(error);
    }
  }

  
   
   //LOGIN API 
   LoginApi ( usserLogin : userLogin ):Observable<any> {
     try { 
      return  this.http.post<any>(this.URL+'/login',usserLogin)
     } catch(error) {
        console.log(error);
     }
   }

   ByidApi(id: string) : Observable<any>{
     try {
       this.token = localStorage.getItem('token');
       let Headers = new HttpHeaders().set('content-Type', 'application/json').set('Authorization',this.token);
       return this.http.get(this.URL+'/user'+id, {headers: Headers})
     } catch (error) {
       
     }
   }

   //RUTAS  ARCHIVOS LOGS
   ArchivosLogs(body: any): Observable<any>{
     try {
       return this.http.post<any>(this.URL+'/admin/logs/',body)
     } catch (error) {
       console.log(error)
     }
    }
//Traer todos los Logs con solo los persmios de usuarios con rol
   GetAllArchivosLogs(): Observable<any>{
      try {
        //this.token =  localStorage.getItem('token');
       // let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token)
          return   this.http.get<any>(this.URL+'/admin/logs/');
      } catch (error) {
        console.log(error)
      }
    }

  //ENVIAR CORREO  REGISTRO
   EnviarEmailsRegistro(body: any): Observable<any>{
     try {
       return this.http.post<any>(this.URL+'/correoregistro',body);
     } catch (error) {
       console.log(error)
     }
   }
//ENVIAR CORREO DE ALERTA MUCHOS INTENTOS 
   EnviarEmaiIntentos(body: any): Observable<any>{
    try {
      return this.http.post<any>(this.URL+'/enviarcorreoIntentos',body);
    } catch (error) {
      console.log(error)
    }
    }

// LISTA DE PRODUCTOS para admins y para compradores 
    listproducts(): Observable<any>{
      try {
        return this.http.get<any>(this.URL+'/productos/create');
      } catch (error) {
        console.log(error)
      }
    }

    //AGREGAR PRODUCTOS POR PARTE DEL VENDEDOR 

    regsitroPrducto(body: any): Observable<any> {
     try {
       return this.http.post<any>(this.URL +'/productos/create',body);
     } catch (error) {
       console.log(error)
     } 
    }

    //ELIMINAR PRODUCTOS  POR PARTE DEL VENDEDOR 

    DeleteProducto(id: string): Observable<any> {
     try {
      return this.http.delete<any>(this.URL + '/delete/product/'+id);
     } catch (error) {
       console.log(error)
     }
    }

    //EDITAR PRODUCTO POR EL VENDEDOR 

    EditarProductos(id: string, body: any): Observable<any>{
      try {
        return this.http.put<any>(this.URL + '/productos/create/'+id,body);
      } catch (error) {
        console.log(error)
      }
    }



    
  
    
}




