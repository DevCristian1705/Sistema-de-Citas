import {Component, EventEmitter, OnInit, Output} from '@angular/core'; 
import { forkJoin, Subject } from 'rxjs';
import { IAuth } from 'src/app/Auth/interface/auth.interface';
import { AuthService } from 'src/app/Auth/services/auth.service'; 
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service';
import { AppComponent} from '../../../app.component'; 
 

@Component({
    selector: 'app-menu',
    template: `  
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
   `
  })
export class AppMenuComponent implements OnInit {
    model: any[];  
    public FlgRetornaNuevoToken: Subject<boolean> = new Subject<boolean>();
  
    constructor(
        public app: AppComponent,  
    ) { 
    }
    ngOnInit() {
      this.model = [ 
          { 
            label: 'Usuario', icon: 'pi pi-fw pi-star-fill',  
            items: [
                {label: 'Registro de citas', icon: 'pi pi-fw pi-id-card', routerLink: ['/modulos/home/cita']}, 
                {label: 'Cambio contraseña', icon: 'pi pi-fw pi-id-card', routerLink: ['/modulos/home/medico']}, 
                {label: 'Registro de Medicos', icon: 'pi pi-fw pi-id-card', routerLink: ['/modulos/home/medico']}, 
            ]
          }, 
        //   { 
        //     label: 'Cambio contraseña', icon: 'pi pi-fw pi-star-fill', routerLink: ['/modulos/home/almacen/lineas'], 
        //     //   label: 'Usuarios', icon: 'pi pi-fw pi-star-fill',
        //     //   items: [
        //     //       {label: 'Crear usuario', icon: 'pi pi-fw pi-id-card', routerLink: ['/modulos/home/almacen/lineas']}, 
        //     //   ]
        //   }, 
      ];
  }

 

}
