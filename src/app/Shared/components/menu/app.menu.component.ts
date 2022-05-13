import {Component, OnInit} from '@angular/core'; 
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
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
    model: MenuItem[];  
    public FlgRetornaNuevoToken: Subject<boolean> = new Subject<boolean>();
    dataDesencryptada : any = JSON.parse(sessionStorage.getItem('datosUsuario'))

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
                {label: 'Registro de Doctores', icon: 'pi pi-fw pi-id-card', routerLink: ['/modulos/home/doctor'], visible: this.dataDesencryptada.isadmin}, 
                {label: 'Registro dias Atencion', icon: 'pi pi-fw pi-id-card', routerLink: ['/modulos/home/diasAtencion'], visible: this.dataDesencryptada.isdoctor}, 
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
