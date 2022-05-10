import {Component, EventEmitter, Output} from '@angular/core';   
import { LoginService } from 'src/app/Auth/services/login.service';
import { HomeComponent } from 'src/app/Modulos/home/home.component'; 

@Component({
    selector: 'app-topbar',
    templateUrl: './app-topbar.component.html',
    styleUrls: ['./app.topbar.component.scss'],
  
})
export class AppTopBarComponent {
 
  @Output() mPredeterminado: EventEmitter<any> = new EventEmitter<any>(); 
 
  usuariologeado: string ="Cristian";
  rolUsuario : string= "";
  dataDesencryptada : any;

  constructor(
      public appMain: HomeComponent,  
      private loginService : LoginService, 
  ) {
    this.onPintarDatos();
  } 

  onPintarDatos(){  
    if(this.usuariologeado.length > 20){
        this.usuariologeado = this.usuariologeado.slice(0,-10) + '...';
    } 
    this.rolUsuario = 'Administrador';
  }
 
  onLogout(){
      this.loginService.logout();
  }
 

}
