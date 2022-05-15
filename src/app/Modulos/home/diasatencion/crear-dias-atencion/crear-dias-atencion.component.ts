import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { ConstantesGenerales, InterfaceColumnasGrilla } from 'src/app/Shared/interfaces/shared.interfaces';
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service'; 
import { ICrearDiasAtencion } from '../../horario/interface/horario.interface';
import { HorarioService } from '../../horario/service/horario.service';

@Component({
  selector: 'app-crear-dias-atencion',
  templateUrl: './crear-dias-atencion.component.html',
  styleUrls: ['./crear-dias-atencion.component.scss']
})
export class CrearDiasAtencionComponent implements OnInit {

  Form: FormGroup;
  dataHorarios: any;
  dates: Date[];
  fechasSeleccionada : any[] = [];
  cols : InterfaceColumnasGrilla[] = []
  es = ConstantesGenerales.ES_CALENDARIO;
  fechaActual = new Date();
  dataDesencryptada : any = JSON.parse(sessionStorage.getItem('datosUsuario'))


  constructor(
    private dateFormat : DatePipe,
    private config : PrimeNGConfig,
    private swal : MensajesSwalService,
    private apiService : HorarioService,
  ) { }

  ngOnInit(): void {
    this.config.setTranslation(this.es) 
  }

  onCapturarFechas(event){ 
    if(event){   

      if(event < this.fechaActual){
        this.swal.mensajeInformacion('La fecha no puede ser menor a la fecha actual');
      }else{
        let nuevafecha = this.dateFormat.transform(event, ConstantesGenerales._FORMATO_FECHA_BUSQUEDA)

        const numeroDia = new Date(event).getDay();
        const nombreDia = ConstantesGenerales.ES_CALENDARIO.dayNamesUpper[numeroDia];  
  
        let Existefecha = this.fechasSeleccionada.find(x => x.diaatencion === nuevafecha) 
        if(!Existefecha){
          this.fechasSeleccionada.push({nombredia: nombreDia,  diaatencion :nuevafecha,  idusuariodoctor : this.dataDesencryptada.idusuario, }); 
        }else{
          this.swal.mensajeInformacion('La fecha ya se encuentra seleccionada');
        } 
        this.onArmarTabla();  
      }

    } 
  }

  onArmarTabla(){  
    this.cols = [   
      { field: 'nombredia', header: 'Día', visibility: true},  
      { field: 'diaatencion', header: 'Fecha', visibility: true},   
      { field: 'acciones', header: 'Ajustes', visibility: true  }, 
    ];
  }

  onEliminar(event, indice){ 
    if(event){
      let Existefecha = this.fechasSeleccionada.find(x => x.diaatencion === event.diaatencion) 
      if(Existefecha){ 
        this.fechasSeleccionada.splice(indice, 1); 
      }
    } 
  }
 
  onGuardar(){ 
    this.apiService.crearDiasAtecion(this.fechasSeleccionada).subscribe((resp)=>{
      if(resp){
        this.swal.mensajeExito('Se guardo los dias de atención con exito!.');
        this.fechasSeleccionada = null;
      }
    }) 
  }
  

}
