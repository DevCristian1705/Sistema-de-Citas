import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/Auth/interface/auth.interface';
import { ConstantesGenerales } from 'src/app/Shared/interfaces/shared.interfaces';
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service'; 
import { DoctorService } from '../service/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './crear-doctor.component.html',
  styleUrls: ['./crear-doctor.component.scss']
})
export class CrearDoctorComponent implements OnInit {

 
  @Input() dataMedico : number;
  Form : FormGroup;
  arraySexo: any[] = ConstantesGenerales.arraySexo
  arraytipoAdmin: any[] = ConstantesGenerales.arraytipoAdmin
  cambiarIconEye: string = "fa fa-eye"; 
  constructor(
    private swal : MensajesSwalService, 
    private apiService : DoctorService
  ) {
    this.builform(); 
  
   }

   private builform(): void {
    this.Form = new FormGroup({ 
      colegiatura: new FormControl(null, Validators.required), 
      usuario: new FormControl(null, Validators.required), 
      nombres: new FormControl(null, Validators.required),  
      apellidoPaterno: new FormControl(null, Validators.required), 
      apellidoMaterno: new FormControl(null, Validators.required), 
      fechaNacimiento: new FormControl(null, Validators.required),  
      sexo : new FormControl(null, Validators.required),  
      direccion: new FormControl(null, Validators.required),  
      correo: new FormControl(null, Validators.email),  
      telefono: new FormControl(null, Validators.required),  
      password : new FormControl(null, Validators.required),
      isadmin : new FormControl(null, Validators.required)
    });
  }
 

  ngOnInit(): void {   
  }
   

  onGuardar(){  
    const data = this.Form.value; 
    const newDoctor : IUsuario = {
      idusuario : 0,
      colegiatura: data.colegiatura,
      nombres: data.nombres,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno, 
      fechaNacimiento: data.fechaNacimiento, 
      sexo: data.sexo.codigo, 
      direccion: data.direccion, 
      correo: data.correo, 
      telefono: data.telefono, 
      usuario: data.usuario,
      password: data.password,
      isadmin : data.isadmin.codigo,
      isdoctor : true, 
    }
    console.log(newDoctor);
    this.apiService.crearDoctor(newDoctor).subscribe((resp) => {
      if(resp){
        this.swal.mensajeExito('se guardó correctamente'); 
        this.Form.reset();
      }
    }, error => {
      this.swal.mensajeError(error);
    });


  }
  

  viewPassword(input) {
    input.type = input.type === 'password' ? 'text' : 'password'; 
    this.cambiarIconEye = input.type === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'; 
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
