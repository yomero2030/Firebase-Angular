import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendMailComponent } from './components/send-mail/send-mail.component';
import {ListProductsComponent} from './components/admin/componentes/list-products/list-products.component';
import {ListLogsComponent } from './components/admin/componentes/list-logs/list-logs.component';
import {ListUSerComponent } from './components/admin/componentes/list-user/list-user.component';
import {UpdateProductosComponent } from  './components/vendedor/componentes/update-productos/update-productos.component';
import {TerminosYcondicionesComponent } from './components/terminos-ycondiciones/terminos-ycondiciones.component'
import {RegistroProductsComponent} from './components/vendedor/componentes/registro-products/registro-products.component';
import { from } from 'rxjs';
const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch :'full',
  },
 { path:'login',
 loadChildren:() => 
  import('./components/login/login.module').then(m => m.LoginModule) }, 
  { path:'registro',
 loadChildren:() => 
 import('./components/registro/registro.module').then(m => m.RegistroModule) },
  {path:'home', 
  loadChildren:() => 
  import('./components/home/home.module').then(m => m.HomeModule) },

  { path:'verification-email',
    component: SendMailComponent
  },
  {
    path: 'listaLogs',
    component: ListLogsComponent
  },
  {
    path: 'listaUsuario',
    component: ListUSerComponent
  },
  {
    path:'listaProductos',
    component: ListProductsComponent
  },
  {
    path: 'registo/producto',
    component: RegistroProductsComponent
  },
  {
    path: 'avisoPrivacidad',
    component: TerminosYcondicionesComponent
  },
  {
    path: 'vendedor/listavendedor',
    component: UpdateProductosComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
