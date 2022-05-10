import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HomeRoutingModule } from './home-routing.module';     
import { HomeComponent } from './home.component';  
import { SharedModule } from 'src/app/Shared/shared.module'; 
import { CrearCitaComponent } from './usuario/crear-cita/crear-cita.component';
import { PrimeNGModule } from 'src/app/Utilitarios/PrimeNG/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ 
    HomeComponent,  
    CrearCitaComponent
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
