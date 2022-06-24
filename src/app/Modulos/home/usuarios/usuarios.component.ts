import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/Auth/interface/auth.interface'; 
import { LoginService } from 'src/app/Auth/services/login.service';
import { ConstantesGenerales } from 'src/app/Shared/interfaces/shared.interfaces';
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service';
import { DoctorService } from '../doctor/service/doctor.service'; 

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  Form : FormGroup;
  arraySexo: any[] = ConstantesGenerales.arraySexo
  arraytipoAdmin: any[] = ConstantesGenerales.arraytipoAdmin
  cambiarIconEye: string = "fa fa-eye";  
  DataUsuarioEdit : IUsuario;
  arrayUsuarios : IUsuario[]; 
  idUsuarioBuscar : number = 0 ;
  usuarioSelecionado : boolean = true;

  constructor(
    private swal : MensajesSwalService, 
    private apiService: DoctorService,
    private usuarioService : LoginService, 
    private router : Router, 
  ) {
    this.builform();  
   }

   private builform(): void {
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
      isadmin : new FormControl(null, Validators.required)
    });
  }
 

  ngOnInit(): void {   
    this.onCargarUsuarios(); 
  }
  
  onCargarUsuarios(){
    this.apiService.getUsuarios().subscribe((resp)=> {  
      if(resp){
        this.arrayUsuarios = resp.data; 
      }
    });
  }

  onSeleccionarUsuario(event: any){  
    if(event){
      this.DataUsuarioEdit = null
      this.idUsuarioBuscar = event.idusuario; 
      this.usuarioSelecionado = false
    }else{
      this.DataUsuarioEdit = null;
      this.usuarioSelecionado = true;
    }
  }
  
  onDatosPorIdUsuario(){ 
    this.swal.mensajePreloader(true);
    this.apiService.getUsuarioId(this.idUsuarioBuscar).subscribe((resp) => { 
      if(resp){   
        this.DataUsuarioEdit = resp
        this.Form.patchValue({  
          usuario: this.DataUsuarioEdit.usuario,
          nombres: this.DataUsuarioEdit.nombres,
          apellidoPaterno: this.DataUsuarioEdit.apellidoPaterno,
          apellidoMaterno: this.DataUsuarioEdit.apellidoMaterno,
          fechaNacimiento: new Date(this.DataUsuarioEdit.fechaNacimiento), 
          sexo: this.arraySexo.find(
            (x) => x.codigo === this.DataUsuarioEdit.sexo
          ), 
          direccion: this.DataUsuarioEdit.direccion,
          correo: this.DataUsuarioEdit.correo,
          telefono: this.DataUsuarioEdit.telefono, 
          isadmin: this.DataUsuarioEdit.isadmin, 
          password : this.DataUsuarioEdit.password,
          pass: this.DataUsuarioEdit.pass, 
        })
        this.swal.mensajePreloader(false);
      }else{
        this.swal.mensajeAdvertencia('No se encontraron datos...');
      }
    }, error => {
      this.swal.mensajePreloader(false);
      this.swal.mensajeError(error);
    })
  }
 
  onGuardar(){   
    const dataform = this.Form.value;
    const data : IUsuario = {
      idusuario :this.DataUsuarioEdit.idusuario,
      usuario: dataform.usuario,
      nombres: dataform.nombres,
      apellidoPaterno: dataform.apellidoPaterno,
      apellidoMaterno: dataform.apellidoMaterno, 
      fechaNacimiento: dataform.fechaNacimiento, 
      nombrecompleto : dataform.nombres + ' ' + dataform.apellidoPaterno + ' ' + dataform.apellidoMaterno,
      sexo: dataform.sexo.codigo,
      direccion: dataform.direccion,
      correo: dataform.correo,
      telefono: dataform.telefono,
      password: this.DataUsuarioEdit.pass, 
      pass: this.DataUsuarioEdit.pass,
      isadmin : dataform.isadmin,
      isdoctor : this.DataUsuarioEdit.isdoctor,
    }  
 
    this.usuarioService.crearUsuario(data).subscribe((resp)=> {
      if(resp){
        this.swal.mensajeExito('Cambios realizados exitosamente!.');   
        this.DataUsuarioEdit = null; 
        this.arrayUsuarios = null;
        this.onCargarUsuarios(); 
        this.usuarioSelecionado = true;
      }
    }, error => {
      this.swal.mensajeError(error);  
    }) 
    
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
    


     
  onCancelar(){ 
    this.router.navigate(['/modulos/home/cita'])  
  }
 
    
}