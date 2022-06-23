import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/Auth/interface/auth.interface'; 
import { LoginService } from 'src/app/Auth/services/login.service'; 
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service';
import { DoctorService } from '../doctor/service/doctor.service'; 

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.scss']
})
export class CambioPasswordComponent implements OnInit {
 
  Form : FormGroup;
  cambiarIconEye: string = "fa fa-eye"; 
  cambiarIconEye1: string = "fa fa-eye"; 
  dataDesencryptada : any = JSON.parse(sessionStorage.getItem('datosUsuario'))
  DataUsuarioEdit : IUsuario;

  constructor(
    private swal : MensajesSwalService, 
    private apiService: DoctorService,
    private usuarioService : LoginService, 
  ) {
    this.builform();  
   }

   private builform(): void {
    this.Form = new FormGroup({  
      usuario: new FormControl(null),
      password : new FormControl(null, Validators.required),
      passwordActual : new FormControl(null, Validators.required), 
    });
  }
 

  ngOnInit(): void {   
    this.onDatosPorIdUsuario();
  }

  onDatosPorIdUsuario(){ 
    this.apiService.getUsuarioId(+this.dataDesencryptada.idusuario).subscribe((resp) => { 
      if(resp){    
        this.DataUsuarioEdit = resp
        this.Form.patchValue({  
          usuario: this.DataUsuarioEdit.usuario, 
         })
      }else{
        this.swal.mensajeAdvertencia('No se encontraron datos...');
      }
    }, error => {
      this.swal.mensajeError(error);
    })
  }
 
  onGuardar(){   
    const dataform = this.Form.value;
    if(dataform.passwordActual !=  this.DataUsuarioEdit.pass){
      this.swal.mensajeAdvertencia('La contraseña actual no es correcta');
      return;
    }

    const data : IUsuario = {
      idusuario : this.DataUsuarioEdit.idusuario,
      usuario: this.DataUsuarioEdit.usuario,
      nombres: this.DataUsuarioEdit.nombres, 
      apellidoPaterno: this.DataUsuarioEdit.apellidoPaterno,
      apellidoMaterno: this.DataUsuarioEdit.apellidoMaterno, 
      fechaNacimiento: this.DataUsuarioEdit.fechaNacimiento, 
      nombrecompleto: this.DataUsuarioEdit.nombrecompleto,
      sexo: this.DataUsuarioEdit.sexo, 
      direccion: this.DataUsuarioEdit.direccion, 
      correo: this.DataUsuarioEdit.correo, 
      telefono: this.DataUsuarioEdit.telefono,
      password: dataform.password, 
      pass: dataform.password, 
      isadmin : this.DataUsuarioEdit.isadmin,
      isdoctor : this.DataUsuarioEdit.isdoctor,
      colegiatura : this.DataUsuarioEdit.colegiatura,  
    }  
 
    this.usuarioService.crearUsuario(data).subscribe((resp)=> {
      if(resp){
        this.swal.mensajeExito('Cambio la contraseña correctamente');  
        this.Form.reset(); 
        this.onDatosPorIdUsuario();
      }
    }, error => {
      this.swal.mensajeError(error);  
    }) 
    
  }
   

  viewPassword(input) {
    input.type = input.type === 'password' ? 'text' : 'password'; 
    this.cambiarIconEye = input.type === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'; 
  }


  viewPassword1(input) {
    input.type = input.type === 'password' ? 'text' : 'password'; 
    this.cambiarIconEye1 = input.type === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'; 
  }

  validateFormat(event) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
     if (!regex.test(key)) {
      event.returnValue = false;
       if (event.preventDefault) {
        event.preventDefault();
       }
     }
    }
    
 
    
}