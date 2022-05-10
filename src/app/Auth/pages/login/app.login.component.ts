import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service'; 
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  styleUrls : ['./app.login.component.scss']
})
export class AppLoginComponent {
  
  loginForm: FormGroup; 
  RecordarLogin: any;  
  checkRecordarLogin :boolean;
  cambiarIconEye: string = "fa fa-eye";
  dataLocalStorage:any

  constructor(    
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService : AuthService,
    private swal: MensajesSwalService
  ) { 
    this.builform();
    this.RecordarLogin = localStorage.getItem('rememberMe');  
    this.dataLocalStorage = JSON.parse(localStorage.getItem('loginEncryptado'));
    if(this.RecordarLogin === "true"){
      this.checkRecordarLogin = true; 
      this.loginForm.controls['usuario'].setValue(this.dataLocalStorage.usuario);
    }
  }


  private builform(): void {
    this.loginForm = this.formBuilder.group({
      usuario: new FormControl( null, Validators.required),
      password: new FormControl( null, [Validators.required, Validators.minLength(4)]), 
      rememberMe: new FormControl(null),    
    });
  }
 
  viewPassword(input) {
    input.type = input.type === 'password' ? 'text' : 'password'; 
    this.cambiarIconEye = input.type === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'; 
  }
  
  onLogin(){ 
    const dataForm = this.loginForm.value; 
    const data = {
      usuario:  dataForm.usuario,
      password :  dataForm.password
    }
    this.apiService.login(data).subscribe((resp) => {
      if(resp){
        localStorage.setItem('rememberMe', dataForm.rememberMe ? dataForm.rememberMe : null); 
        this.swal.mensajeExito('Bienvenido al Sistema!!.')
        setTimeout(() => {
          this.router.navigate(['/modulos/home'])  
        }, 1500);
      }
    }, error => {
      this.swal.mensajeError('Usuario o contraseña incorrecto!.');
    });
 
  } 
  
  
  onValidateForm(campo: string) {
    return ( this.loginForm.controls[campo].errors && this.loginForm.controls[campo].touched );
  }
  
}
