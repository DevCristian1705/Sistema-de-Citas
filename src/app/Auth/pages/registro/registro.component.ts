import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service'; 
import { IUsuario } from '../../interface/auth.interface';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  Form : FormGroup; 
  arraySexo: any[] = [];
  cambiarIconEye: string = "fa fa-eye";

  
  constructor(    
    private swal : MensajesSwalService,  
    private router : Router,
    private apiService : LoginService,
  ) {
    this.builform();

    this.arraySexo = [
      {nombre : 'MASCULINO', codigo: 'M'},
      {nombre : 'FEMENINO', codigo: 'F'}, 
    ]

   }

   public builform(): void {
    this.Form = new FormGroup({ 
      usuario: new FormControl(null, Validators.required), 
      nombres: new FormControl(null, Validators.required),  
      apellidoPaterno: new FormControl(null, Validators.required), 
      apellidoMaterno: new FormControl(null, Validators.required), 
      fechaNacimiento: new FormControl(null, Validators.required),  
      sexo : new FormControl(null, Validators.required),  
      direccion: new FormControl(null, Validators.required),  
      correo: new FormControl(null, Validators.email),  
      telefono: new FormControl(null, Validators.required),  
      password : new FormControl(null, Validators.required)
    })
  }
 


  ngOnInit(): void { 
  }
 
  
  onGuardar(){
    const data = this.Form.value; 
    const newUsuario : IUsuario = {
      idusuario : 0, 
      nombres: data.nombres,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno, 
      fechaNacimiento: data.fechaNacimiento, 
      nombrecompleto : data.nombres + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno, 
      sexo: data.sexo.codigo, 
      direccion: data.direccion, 
      correo: data.correo, 
      telefono: data.telefono, 
      usuario: data.usuario,
      password: data.password, 
      isadmin : false,
      isdoctor : false
    }
    console.log(newUsuario);
    this.apiService.crearUsuario(newUsuario).subscribe((resp) => {
      if(resp){
        this.swal.mensajeExito('se guardó correctamente');
        setTimeout(() => {
          this.router.navigate(['/auth']); 
        }, 1000); 
      }
    }, error => {
      this.swal.mensajeError(error);
    });


 
     
  }
 

  viewPassword(input) {
    input.type = input.type === 'password' ? 'text' : 'password'; 
    this.cambiarIconEye = input.type === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'; 
  }

  onCancelar(){
    this.router.navigate(['/auth']);
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
