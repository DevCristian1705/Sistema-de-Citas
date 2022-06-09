import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { AuthGuard } from 'src/app/Auth/guards/auth.guard';   
import { AppNotfoundComponent } from 'src/app/Auth/pages/not-found/app.notfound.component';
import { CambioPasswordComponent } from './cambio-password/cambio-password.component';
import { CrearCitaComponent } from './cita/crear-cita/crear-cita.component';
import { CrearDiasAtencionComponent } from './diasatencion/crear-dias-atencion/crear-dias-atencion.component';
import { CrearDoctorComponent } from './doctor/crear-doctor/crear-doctor.component';
import { HistorialComponent } from './historial/historial.component';
import { HomeComponent } from './home.component';     
import { ValidarCitasComponent } from './validar-citas/validar-citas.component';

const routes: Routes = [
   
  {
    path: '',
    component: HomeComponent, 
    canLoad : [AuthGuard],
    canActivate : [AuthGuard],
    children : [ 
      {
        path: 'cita',
        component : CrearCitaComponent,
        canLoad : [AuthGuard],
        canActivate : [AuthGuard]
      },
      {
        path: 'doctor',
        component : CrearDoctorComponent,
        canLoad : [AuthGuard],
        canActivate : [AuthGuard]
      }, 
      {
        path: 'diasAtencion',
        component : CrearDiasAtencionComponent,
        canLoad : [AuthGuard],
        canActivate : [AuthGuard]
      },
      {
        path: 'cambiopassword',
        component : CambioPasswordComponent,
        canLoad : [AuthGuard],
        canActivate : [AuthGuard]
      },
      {
        path: 'historial',
        component : HistorialComponent,
        canLoad : [AuthGuard],
        canActivate : [AuthGuard]
      },
      {
        path: 'validar-citas',
        component : ValidarCitasComponent,
        canLoad : [AuthGuard],
        canActivate : [AuthGuard]
      }
    ]
  }, 
  {
    path: '**',
    component : AppNotfoundComponent
  },  
  {
    path: '', 
    redirectTo: '', 
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
