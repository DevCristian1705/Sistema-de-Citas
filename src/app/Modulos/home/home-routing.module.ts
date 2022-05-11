import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { AuthGuard } from 'src/app/Auth/guards/auth.guard';   
import { AppNotfoundComponent } from 'src/app/Auth/pages/not-found/app.notfound.component';
import { CrearCitaComponent } from './cita/crear-cita/crear-cita.component';
import { HomeComponent } from './home.component';   
import { CrearMedicoComponent } from './medico/crear-medico/crear-medico.component';

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
        path: 'medico',
        component : CrearMedicoComponent,
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
