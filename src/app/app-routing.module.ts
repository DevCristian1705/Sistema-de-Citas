import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';   
import { AppAccessdeniedComponent } from './Auth/pages/acceso-denegado/app.accessdenied.component';
import { AppNotfoundComponent } from './Auth/pages/not-found/app.notfound.component';
import { AuthGuard } from './Auth/guards/auth.guard';
 

const routes : Routes = [
    {
      path: 'auth',
      loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule), 
    }, 
    {
      path: 'modulos',
      loadChildren: ()=> import('./Modulos/modulos.module').then(m=> m.ModulosModule),
      canLoad : [AuthGuard],
      canActivate : [AuthGuard]
    },
    {
      path: 'pagina-no-encontrada',
      component : AppNotfoundComponent
    }, 
    {
      path: 'acceso-denegado',
      component : AppAccessdeniedComponent
    },  
    {
      path: '', 
      redirectTo: 'auth', 
      pathMatch: 'full'
    },
 
  ]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
