import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendMailComponent } from './components/send-mail/send-mail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/home',
    pathMatch : 'full',
  },
 { path: 'login',
 loadChildren: () => 
 import('./components/login/login.module').then(m => m.LoginModule) }, 
{ path: 'registro',
 loadChildren: () => 
 import('./components/registro/registro.module').then(m => m.RegistroModule) },
  { path: 'home', 
  loadChildren: () => 
  import('./components/home/home.module').then(m => m.HomeModule) },
  {path:'verification-email',
    component: SendMailComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
