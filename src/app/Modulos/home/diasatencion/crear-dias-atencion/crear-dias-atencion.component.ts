import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { min, tap } from 'rxjs/operators';
import { IUsuario } from 'src/app/Auth/interface/auth.interface';
import { ConstantesGenerales, InterfaceColumnasGrilla } from 'src/app/Shared/interfaces/shared.interfaces';
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service';  
import { DoctorService } from '../../doctor/service/doctor.service';
import { DiasAtencionService } from '../service/diasatecion.service';

@Component({
  selector: 'app-crear-dias-atencion',
  templateUrl: './crear-dias-atencion.component.html',
  styleUrls: ['./crear-dias-atencion.component.scss']
})
export class CrearDiasAtencionComponent implements OnInit {

  Form: FormGroup;
  dataHorarios: any; 
  horariosGenerados : any[] = []; 
  es = ConstantesGenerales.ES_CALENDARIO;
  fechaActual = new Date(); 
  dataDesencryptada : any = JSON.parse(sessionStorage.getItem('datosUsuario'))
  arrayDoctores : IUsuario[];     
  mostrarTablaGenerar : boolean = false;
  HoraQueSelecciono :any; 

  idMedicoSeleccionado : number = 0;


  constructor(
    private dateFormat : DatePipe,
    private config : PrimeNGConfig,
    private swal : MensajesSwalService,
    private apiService : DiasAtencionService,
    private doctorService: DoctorService,
    private fb : FormBuilder,
  ) { 
    this.builform();
  } 

  public builform(){
    this.Form = new FormGroup({
      Medico : new FormControl(null, Validators.required),
      FechaAtencion: new FormControl(this.fechaActual, Validators.required),
      CantidadCitas: new FormControl(1), 
    })
  }


  ngOnInit(): void {
    this.config.setTranslation(this.es) 
    this.onCargarDoctores();  
  }

  onCargarDoctores(){
    this.doctorService.getDoctores().subscribe((resp)=> {  
      if(resp){
        this.arrayDoctores = resp.data; 
      }
    });
  } 
  
  onChangeMedico(event){
    console.log('event',event.value);
    if(event.value){ 
      // if( this.idMedicoSeleccionado != event.value.idusuario){
      //   this.horariosGenerados = []; 
      //   this.mostrarTablaGenerar = false;
      // }
       this.idMedicoSeleccionado = event.value.idusuario
    }else{
      this.horariosGenerados = []; 
      this.mostrarTablaGenerar = false;
    }
  }

  onGuardar(){   
    console.log('horarios', this.horariosGenerados)
    this.apiService.crearDiasAtecion(this.horariosGenerados).subscribe((resp)=>{
      if(resp){
        this.swal.mensajeExito('Se guardo los dias de atención con exito!.');
        this.horariosGenerados = [];
        this.mostrarTablaGenerar = false;
        this.builform();
      }
    }) 
  }

 
  onGenerarHorarios(){
    const dataform = this.Form.value 
    if(!dataform.CantidadCitas){
      this.swal.mensajeAdvertencia('Ingresa una cantidad de citas');
      return ;
    }
    let fechaSeleccionada = new Date(dataform.FechaAtencion); 
    let fechaSistema =  new Date(this.fechaActual); 
   
    if(fechaSeleccionada < fechaSistema ){
      this.swal.mensajeAdvertencia('El Horario de la cita no puede ser MENOR a la Hora Actual del Sistema');
      return ;
    }
    const numeroDia = new Date(dataform.FechaAtencion).getDay();
    const nombreDia = ConstantesGenerales.ES_CALENDARIO.dayNamesUpper[numeroDia];  
    
    for( let  i = 0; i < dataform.CantidadCitas ; i++){
      if(this.horariosGenerados.length > 0 && (dataform.FechaAtencion === this.HoraQueSelecciono)){   
        let fechaInicioSumada = this.onSumar30MinutosaFecha(this.horariosGenerados[this.horariosGenerados.length-1].horainicio ) 
        let fechafinSumada = this.onSumar30MinutosaFecha(fechaInicioSumada) 
        this.horariosGenerados.push({
          idusuariodoctor : this.idMedicoSeleccionado,
          diaatencion : this.dateFormat.transform(dataform.FechaAtencion, ConstantesGenerales._FORMATO_FECHA_BUSQUEDA),
          nombredia : nombreDia,
          horainicio :   this.dateFormat.transform(fechaInicioSumada, ConstantesGenerales._FORMATO_FECHA_Y_HORA_BD),
          horafin :  this.dateFormat.transform(fechafinSumada, ConstantesGenerales._FORMATO_FECHA_Y_HORA_BD),
        }) 
      }else{ 
        this.HoraQueSelecciono =  dataform.FechaAtencion
        let fechafinSumada = this.onSumar30MinutosaFecha(this.HoraQueSelecciono ) 
        this.horariosGenerados.push({
          idusuariodoctor : this.idMedicoSeleccionado,
          diaatencion : this.dateFormat.transform(dataform.FechaAtencion, ConstantesGenerales._FORMATO_FECHA_BUSQUEDA),
          nombredia : nombreDia,
          horainicio : this.dateFormat.transform(dataform.FechaAtencion, ConstantesGenerales._FORMATO_FECHA_Y_HORA_BD),
          horafin : this.dateFormat.transform(fechafinSumada, ConstantesGenerales._FORMATO_FECHA_Y_HORA_BD),
        }) 
      } 
    } 
    
    this.mostrarTablaGenerar = true;  
  }

  


  onSumar30MinutosaFecha(fecha) {  
    let fecha2 = new Date(fecha); 
    fecha2.setMinutes(fecha2.getMinutes() + 30);
    return  fecha2 
  }

  onAnularhorarios(){
    this.horariosGenerados = [];
    this.mostrarTablaGenerar = false;
  }


 

}
