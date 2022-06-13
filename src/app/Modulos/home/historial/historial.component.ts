import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { IUsuario } from 'src/app/Auth/interface/auth.interface';
import { ConstantesGenerales, InterfaceColumnasGrilla } from 'src/app/Shared/interfaces/shared.interfaces';
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service';
import { IHistorialCita } from '../cita/interface/cita.interface';
import { CitasService } from '../cita/service/citas.service'; 
import { DoctorService } from '../doctor/service/doctor.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  Form: FormGroup;
  es = ConstantesGenerales.ES_CALENDARIO;
  fechaActual = new Date(); 
  dataDesencryptada : any = JSON.parse(sessionStorage.getItem('datosUsuario'))
  arrayDoctores: IUsuario[];  
  cols: InterfaceColumnasGrilla[] = [];
  colsVisibles: InterfaceColumnasGrilla[] = [];
  listacitas: IHistorialCita[]; 
  idMedicoSeleccionado : number = 0;

  constructor(
    private dateFormat : DatePipe,
    private config : PrimeNGConfig,
    private swal : MensajesSwalService,
    private fb : FormBuilder,
    private doctorService: DoctorService,
    private apiCitas : CitasService,
  ) {
    this.builform();
   }
 
  public builform(){
    this.Form = new FormGroup({
      Medico : new FormControl(null, Validators.required),
      FechaBusqueda: new FormControl(null, Validators.required),
    })
  }


  ngOnInit(): void { 
    if(!this.dataDesencryptada.isadmin) this.Form.controls['FechaBusqueda'].setValue(this.fechaActual);

    this.config.setTranslation(this.es)
    this.onCargarDoctores();

    let MostrarDato 
    !this.dataDesencryptada.isadmin ? MostrarDato = true : false 

    //this.onBuscar();
   
    this.cols = [ 
      { field: 'dni', header: 'DNI', visibility: !MostrarDato }, 
      { field: 'usuario' , header:  'PACIENTE', visibility: !MostrarDato }, 
      { field: 'doctor' , header:  'MEDICO', visibility: MostrarDato }, 
      { field: 'tipocita', header: 'TIPO', visibility: true }, 
      { field: 'fechacita', header: 'FECHA CITA', visibility: true , formatoFecha: ConstantesGenerales._FORMATO_FECHA_VISTA }, 
      { field: 'horarioCita', header: 'HORA CITA', visibility: true}, 
      { field: 'horainicio', header: 'HORA INCIO', visibility: false}, 
      { field: 'horafin', header: 'HORA FIN', visibility: false},  
    ]; 

    
    this.colsVisibles = this.cols.filter(x => x.visibility === true)
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

  onBorrarFecha(){
    this.Form.controls['FechaBusqueda'].setValue(null) 
  }


  onBuscar(){   
    const data =this.Form.value;
    if(!this.dataDesencryptada.isadmin && !data.FechaBusqueda){
      this.swal.mensajeAdvertencia('Debe seleccionar una fecha.');
      return;
    }
  
    const Busqueda = {
      idusuario : !this.dataDesencryptada.isadmin ? +this.dataDesencryptada.idusuario : 0,
      idusuariodoctor: this.idMedicoSeleccionado,
      fechacita: this.dateFormat.transform(data.FechaBusqueda, ConstantesGenerales._FORMATO_FECHA_BUSQUEDA)
    } 
    this.swal.mensajePreloader(true);
    this.apiCitas.getHistorialCitas(Busqueda).subscribe((resp)=> {  
      if(resp.data){ 
        this.listacitas = resp.data;
        this.swal.mensajePreloader(false);
      }else{
        this.swal.mensajeAdvertencia('No se encontradon citas...');
        this.listacitas = []
      }
    },error=> {
      this.swal.mensajeError(error)
    }); 

  }

   

}
