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
 
  usuariologeado: string ="Usuario";
  rolUsuario : string= "Cliente";
  dataDesencryptada : any;
 
  constructor(
      public appMain: HomeComponent,  
      private loginService : LoginService, 
  ) {
    this.onPintarDatos();
  } 

  onPintarDatos(){  
    this.dataDesencryptada = JSON.parse(sessionStorage.getItem('datosUsuario')) 
    console.log(this.dataDesencryptada);
    this.usuariologeado = this.dataDesencryptada.usuario + ' ' +this.dataDesencryptada.apePaterno
    if(this.dataDesencryptada.isadmin === true){
      this.rolUsuario = 'Administrador';
    }
  }
 
  onLogout(){
      this.loginService.logout();
  }
 

}
