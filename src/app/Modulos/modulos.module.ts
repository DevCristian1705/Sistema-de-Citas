import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';  
import { ReactiveFormsModule } from '@angular/forms';  
import { ModulosRoutingModule } from './modulos-routing.module';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';     
import { PrimeNGModule } from '../Utilitarios/PrimeNG/primeng.module';
 
@NgModule({
  declarations: [  
    
  ],
  imports: [
    CommonModule,
    ModulosRoutingModule,
    PrimeNGModule, 
    ReactiveFormsModule,   
    SharedModule, 
  ],

  providers: [
    MessageService,
    ConfirmationService,
    DatePipe,
    {
        provide: LocationStrategy, 
        useClass: HashLocationStrategy
    }, 
  ],  
})
export class ModulosModule { }
