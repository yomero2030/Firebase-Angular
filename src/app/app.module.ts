import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { SendMailComponent } from './components/send-mail/send-mail.component';
import { ProductoComponent } from './components/producto/producto/producto.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { ListUSerComponent } from './components/admin/componentes/list-user/list-user.component';
import { ListLogsComponent } from './components/admin/componentes/list-logs/list-logs.component';
import { ListProductsComponent } from './components/admin/componentes/list-products/list-products.component';
import { UpdateProductosComponent } from './components/vendedor/componentes/update-productos/update-productos.component';
import { RegistroProductsComponent } from './components/vendedor/componentes/registro-products/registro-products.component';
import { FooterComponent } from './components/footer/footer.component';
import { TerminosYcondicionesComponent } from './components/terminos-ycondiciones/terminos-ycondiciones.component';
import { ActualizarComponent } from './components/vendedor/componentes/actualizar/actualizar.component';

import * as firebase from "firebase"
var firebaseConfig : {
  apiKey: "AIzaSyC_IpzrJLhU-Q9irScr_nWEg6HF_t106vo",
  authDomain: "vuefirebase-60210.firebaseapp.com",
  databaseURL: "https://vuefirebase-60210.firebaseio.com",
  projectId: "vuefirebase-60210",
  storageBucket: "vuefirebase-60210.appspot.com",
  messagingSenderId: "1066215669192",
  appId: "1:1066215669192:web:2743e3d0c53ead950894fd",
 
}


firebase.initializeApp(firebaseConfig)
@NgModule({
  declarations: [
    AppComponent, NavbarComponent, SendMailComponent, ProductoComponent,
     ListUSerComponent, ListLogsComponent,
      ListProductsComponent,  UpdateProductosComponent, 
      RegistroProductsComponent, FooterComponent, TerminosYcondicionesComponent, ActualizarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
