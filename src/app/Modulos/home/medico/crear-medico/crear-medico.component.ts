import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service';

@Component({
  selector: 'app-medico',
  templateUrl: './crear-medico.component.html',
  styleUrls: ['./crear-medico.component.scss']
})
export class CrearMedicoComponent implements OnInit {

 
  @Input() dataMedico : number;
  Form : FormGroup;
 
 
  constructor(
    private swal : MensajesSwalService, 
  ) {
    this.builform(); 
   }

   private builform(): void {
    this.Form = new FormGroup({ 
      nroDocumento: new FormControl(null, Validators.required), 
      apellidos: new FormControl(null, Validators.required),   
      nombres: new FormControl(null, Validators.required), 
      telefono: new FormControl(null),   
      email: new FormControl(null),  
      direccionprincipal: new FormControl(null),  
    });
  }
 

  ngOnInit(): void {   
  }
   

  onGuardar(){  
    
  }
  
}
