import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import {first} from 'rxjs/operators';
import { auth} from 'firebase/app';

@Injectable()
export class AuthService {
  public user: User;

  constructor(public afAuth: AngularFireAuth) { }
  
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

   async  loginGoogle(){
     try {
       return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
     } catch (error) {
       
     }
   }
 async login( email: string, password : string){

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

 async registro(email: string, password: string){
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


}
