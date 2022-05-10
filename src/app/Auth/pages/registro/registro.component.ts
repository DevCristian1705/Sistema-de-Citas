import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service'; 


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
    private router : Router
  ) {
    this.builform();

    this.arraySexo = [
      {nombre : 'MASCULINO', codigo: 'M'},
      {nombre : 'FEMENINO', codigo: 'F'}, 
    ]

   }

   public builform(): void {
    this.Form = new FormGroup({ 
      dni: new FormControl(null, Validators.required), 
      nombres: new FormControl(null, Validators.required),  
      apellidoPaterno: new FormControl(null, Validators.required), 
      apellidoMaterno: new FormControl(null, Validators.required), 
      fechaNacimiento: new FormControl(null),  
      sexo : new FormControl(null),  
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
  
    // const newUsuario : IUsuario = {
     
    // }
    this.swal.mensajeExito('se guardó correctamente');

    setTimeout(() => {
      this.router.navigate(['/auth']); 
    }, 1000);
 
     
  }
 

  viewPassword(input) {
    input.type = input.type === 'password' ? 'text' : 'password'; 
    this.cambiarIconEye = input.type === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'; 
  }

  onCancelar(){
    this.router.navigate(['/auth']);
  }


}
