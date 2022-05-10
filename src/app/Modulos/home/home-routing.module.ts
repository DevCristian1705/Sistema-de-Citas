import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { AuthGuard } from 'src/app/Auth/guards/auth.guard';   
import { AppNotfoundComponent } from 'src/app/Auth/pages/not-found/app.notfound.component';
import { HomeComponent } from './home.component'; 
import { CrearCitaComponent } from './usuario/crear-cita/crear-cita.component'; 

const routes: Routes = [
   
  {
    path: '',
    component: HomeComponent, 
    canLoad : [AuthGuard],
    canActivate : [AuthGuard],
    children : [ 
      {
        path: 'citas',
        component : CrearCitaComponent,
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
