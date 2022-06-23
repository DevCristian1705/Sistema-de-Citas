import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HomeRoutingModule } from './home-routing.module';     
import { HomeComponent } from './home.component';  
import { SharedModule } from 'src/app/Shared/shared.module';  
import { PrimeNGModule } from 'src/app/Utilitarios/PrimeNG/primeng.module';
import { ReactiveFormsModule } from '@angular/forms'; 

import { CrearCitaComponent } from './cita/crear-cita/crear-cita.component';   
import { CrearDoctorComponent } from './doctor/crear-doctor/crear-doctor.component';
import { CrearDiasAtencionComponent } from './diasatencion/crear-dias-atencion/crear-dias-atencion.component';
import { CambioPasswordComponent } from './cambio-password/cambio-password.component';
import { HistorialComponent } from './historial/historial.component';
import { ValidarCitasComponent } from './validar-citas/validar-citas.component';
import { ReporteCitasComponent } from './reporte-citas/reporte-citas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
  declarations: [ 
    HomeComponent,  
    CrearCitaComponent, 
    CrearDoctorComponent, 
    CrearDiasAtencionComponent,
    CambioPasswordComponent,
    HistorialComponent,
    ValidarCitasComponent,
    ReporteCitasComponent,
    UsuariosComponent

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,    
    PrimeNGModule, 
    SharedModule, 
    ReactiveFormsModule
  ],  

})
export class HomeModule { }
