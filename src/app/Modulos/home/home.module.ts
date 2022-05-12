import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HomeRoutingModule } from './home-routing.module';     
import { HomeComponent } from './home.component';  
import { SharedModule } from 'src/app/Shared/shared.module';  
import { PrimeNGModule } from 'src/app/Utilitarios/PrimeNG/primeng.module';
import { ReactiveFormsModule } from '@angular/forms'; 

import { CrearCitaComponent } from './cita/crear-cita/crear-cita.component'; 
import { CrearMedicoComponent } from './medico/crear-medico/crear-medico.component';
import { CrearHorarioComponent } from './horario/crear-horario/crear-horario.component';

@NgModule({
  declarations: [ 
    HomeComponent,  
    CrearCitaComponent, 
    CrearMedicoComponent, CrearHorarioComponent
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
