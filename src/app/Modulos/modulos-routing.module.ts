import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router'; 
import { AuthGuard } from '../Auth/guards/auth.guard';   
import { AppNotfoundComponent } from '../Auth/pages/not-found/app.notfound.component';

const routes : Routes = [  
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canLoad : [AuthGuard],
    canActivate : [AuthGuard]
  },
  {
    path: 'pagina-no-encontrada',
    component : AppNotfoundComponent
  },  
  {
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pagina-no-encontrada'
  }
]

@NgModule({ 
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ModulosRoutingModule { }
