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
    ) {}

    ngOnInit() {
      this.model = [ 
          { 
            label: 'MENÚ', icon: 'fas fa-align-justify',  
            items: [
                {label: 'Registro de citas', icon: 'fas fa-calendar-plus', routerLink: ['/modulos/home/cita'], visible: !this.dataDesencryptada.isdoctor },  
                {label: 'Cambio contraseña', icon: 'fas fa-unlock-keyhole', routerLink: ['/modulos/home/cambiopassword'] }, 
                {label: 'Actualizar Usuario', icon: 'fas fa-user-pen', routerLink: ['/modulos/home/usuarios'], visible: this.dataDesencryptada.isadmin }, 
                {label: 'Registro de Doctores', icon: 'fas fa-user-doctor', routerLink: ['/modulos/home/doctor'], visible: this.dataDesencryptada.isadmin }, 
                {label: 'Registro dias Atencion', icon: 'far fa-calendar-check', routerLink: ['/modulos/home/diasAtencion'],  visible: this.dataDesencryptada.isdoctor || this.dataDesencryptada.isadmin},  
                {label: 'Historial', icon: 'fas fa-clock', routerLink: ['/modulos/home/historial']},   
                {label: 'Validar Citas', icon: 'fas fa-clipboard-check', routerLink: ['/modulos/home/validar-citas'], visible: this.dataDesencryptada.isadmin }, 
                {label: 'Reporte Citas', icon: 'fas fa-file', routerLink: ['/modulos/home/reporte-citas'], visible: this.dataDesencryptada.isadmin }, 
            ]
          },  
      ];
  }  
} 