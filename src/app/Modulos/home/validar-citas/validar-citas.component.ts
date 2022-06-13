import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/Auth/interface/auth.interface';
import { ConstantesGenerales, InterfaceColumnasGrilla } from 'src/app/Shared/interfaces/shared.interfaces';
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service';
import { IHistorialCita } from '../cita/interface/cita.interface';
import { CitasService } from '../cita/service/citas.service';
import { DoctorService } from '../doctor/service/doctor.service';

@Component({
  selector: 'app-validar-citas',
  templateUrl: './validar-citas.component.html',
  styleUrls: ['./validar-citas.component.scss']
})
export class ValidarCitasComponent implements OnInit {
  Form: FormGroup; 
  fechaActual = new Date(); 
  dataDesencryptada : any = JSON.parse(sessionStorage.getItem('datosUsuario'))
  arrayDoctores: IUsuario[];  
  cols: InterfaceColumnasGrilla[] = []; 
  listacitas: IHistorialCita[]; 
  listacitasVencidas: any[] = []; 
  idMedicoSeleccionado : number = 0;

  constructor(
    private dateFormat : DatePipe,  
    private swal : MensajesSwalService, 
    private doctorService: DoctorService,
    private apiCitas : CitasService,
  ) {
    this.builform();
   }
 
  public builform(){
    this.Form = new FormGroup({
      Medico : new FormControl(null, Validators.required), 
    })
  }


  ngOnInit(): void {  
    this.onCargarDoctores(); 
 
    this.cols = [ 
      { field: 'dni', header: 'DNI', visibility: false },  
      { field: 'usuario' , header:  'PACIENTE', visibility: true }, 
      { field: 'doctor' , header:  'MEDICO', visibility: true }, 
      { field: 'tipocita', header: 'TIPO', visibility: true }, 
      { field: 'estado', header: 'ESTADO', visibility: true }, 
      { field: 'fechacita', header: 'FECHA', visibility: true , formatoFecha: ConstantesGenerales._FORMATO_FECHA_VISTA }, 
      { field: 'horarioCita', header: 'HORA CITA', visibility: true}, 
      { field: 'horainicio', header: 'HORA INCIO', visibility: false}, 
      { field: 'horafin', header: 'HORA FIN', visibility: false},  
    ]; 
    this.cols = this.cols.filter(x => x.visibility === true)
  } 


  onCargarDoctores(){
    this.doctorService.getDoctores().subscribe((resp)=> {  
      if(resp){
        this.arrayDoctores = resp.data; 
      }
    });
  } 

  onChangeMedico(event){  
    if(event.value){  
      this.idMedicoSeleccionado = event.value.idusuario; 
    }else{  
      this.idMedicoSeleccionado = 0 
    } 
    this.onBuscar()
    this.listacitas = []
  }

  
  onBuscar(){   
    this.listacitasVencidas = [];
    const data =this.Form.value; 
    const Busqueda = {
      idusuario : 0,
      idusuariodoctor: this.idMedicoSeleccionado,
      fechacita: this.dateFormat.transform(data.FechaBusqueda, ConstantesGenerales._FORMATO_FECHA_BUSQUEDA)
    } 
    this.swal.mensajePreloader(true);
    this.apiCitas.getHistorialCitas(Busqueda).subscribe((resp)=> {  
      if(resp.data.length){ 
        this.listacitas = resp.data;
        this.listacitas.forEach((x: any) => { 
          let fechaVencida = this.onSumar48horas(x.horainicio) 
          if(this.fechaActual >= fechaVencida && x.estado === 'RESERVADO'){
            this.listacitasVencidas.push(x);
          } 
        })
       
        this.swal.mensajePreloader(false);
      }else{
        this.swal.mensajeAdvertencia('No se encontradon citas...');
        this.listacitas = []
        this.swal.mensajePreloader(false);
      }
    },error=> {
      this.swal.mensajeError(error)
    }); 

  }

  onSumar48horas(fecha) {  
    let fecha2 = new Date(fecha); 
    fecha2.setHours(fecha2.getHours() + 48);
    return  fecha2 
  }

  onEliminarcitas(){ 
    this.apiCitas.deleteCitasVencidas(this.listacitasVencidas).subscribe((resp)=> {
      if(resp){
        this.swal.mensajeExito('Se liberaron todas las citas');
        this.onBuscar();
      }
    })
  
  }

}
