import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { AuthRoutingModule } from './auth-routing.module';  
import { ReactiveFormsModule } from '@angular/forms'; 
import { PrimeNGModule } from '../Utilitarios/PrimeNG/primeng.module';
import { AppLoginComponent } from './pages/login/app.login.component';
import { AppAccessdeniedComponent } from './pages/acceso-denegado/app.accessdenied.component';
import { AppErrorComponent } from './pages/error/app.error.component';
import { AppNotfoundComponent } from './pages/not-found/app.notfound.component';
import { RegistroComponent } from './pages/registro/registro.component';  


@NgModule({
  declarations: [
    AppLoginComponent, 
    AppAccessdeniedComponent,
    AppErrorComponent,
    AppNotfoundComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    AuthRoutingModule, 
    PrimeNGModule, 
  ]
})
export class AuthModule { }
