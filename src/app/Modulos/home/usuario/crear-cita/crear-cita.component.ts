import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import { PrimeNGConfig } from 'primeng/api';
import { ConstantesGenerales, InterfaceColumnasGrilla } from 'src/app/Shared/interfaces/shared.interfaces';
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.scss']
})
export class CrearCitaComponent implements OnInit {
  modalCita: boolean = false;
  mostrarCalendario: boolean = false;
  modalPagarcita: boolean = false;
  modaldatosCitaEditar: boolean = false;
  datosCitaEditar: any[] = [];
  agregarCitaCalendario :any
  mostrarAdjuntar : boolean =false;
  mostrarEnviarNotificacion : boolean =false;
  ImgBase64 : string = "";

  dataCita : any[]=[];
  fechaCitasolicitada :any
  citaForm: FormGroup; 
  es = ConstantesGenerales.ES_CALENDARIO
  arrayOdontologo : any []= [];
  arrayTipoConsulta : any []= [];
  listaCitas : any[] = [];
  nuevaCitas :any[] = [];
  cols: InterfaceColumnasGrilla[] = []; 
  precioConsultaSeleccionada: string = "";



  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale : 'es',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: ''
    },
    dayPopoverFormat: {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
    dateClick: this.handleDateClick.bind(this), 
    events: [
      { title: 'JUAN', date: '2022-05-10', start: '2022-05-09T09:30:00', end: '2017-05-09T11:30:00'},
      { title: 'CHOO', date: '2022-05-10',start: '2022-05-09T11:30:00', end: '2017-05-09T12:30:00'}
    ], 
    eventClick: function(arg){
      this.onLevantarDatos(arg.event)
    },

    selectable:true,
  
  };
  
  constructor(
    private swal : MensajesSwalService,
    private config : PrimeNGConfig,
    private formatDate : DatePipe
  ){
    this.builform();

    this.arrayOdontologo = [
      {nombre: 'CRISTIAN', codigo: 1},
      {nombre: 'FRANKLIN', codigo: 2},
      {nombre: 'JOSE', codigo: 3},
    ]
    this.arrayTipoConsulta = [
      {nombre: 'CONSULTA', codigo: 1, precio: '50'},
      {nombre: 'TRATAMIENTO', codigo: 2, precio : '150'}, 
    ]
  }

  private builform(): void {
    this.citaForm = new FormGroup({
      odontologo: new FormControl( null),
      paciente: new FormControl( null, Validators.required), 
      horarioInicio: new FormControl( null, Validators.required), 
      horarioFin: new FormControl(null, Validators.required), 
    });
  }
 
  ngOnInit() {
    this.config.setTranslation(this.es)

    this.cols = [  
      { field: 'codigo', header: 'id', visibility: false  },  
      { field: 'horarioinicio', header: 'Hora Inicio', visibility: true},  
      { field: 'horariofin', header: 'Hora Fin', visibility: true},   
    ];
    this.cols = this.cols.filter(x => x.visibility === true)
    this.listaCitas = [ 
      {
        codigo: "1004",
        horarioinicio: "10:00:00",
        horariofin: "11:00:00", 
      },
      {
        codigo: "1005",
        horarioinicio: "11:00:00",
        horariofin: "12:00:00", 
      },
      {
        codigo: "1006",
        horarioinicio: "12:00:00",
        horariofin: "13:00:00", 
      }, 
    ]
  }

  onLevantarDatos(data: any): void{
    this.datosCitaEditar = data
    this.modaldatosCitaEditar = true;
  }

  onSeleccionoOdontologo(event :any){
    if(event){
      this.mostrarCalendario = true
    }
  }

  handleDateClick(arg) { 
    console.log('click al item',arg);
   this.fechaCitasolicitada = arg.dateStr
   this.modalCita= true;
  }


  onSeleccionarTipoConsulta(event: any){  
    if(!event.value){
      this.precioConsultaSeleccionada = null
    }else{
      this.precioConsultaSeleccionada = event.value.precio
    }
  }
 
  onSeleccionarCitas(event : any){    
    if(!this.precioConsultaSeleccionada){
      this.swal.mensajeAdvertencia('Selecciona un tipo de consulta.');
      return;
    }
    if(event){ 
      this.swal.mensajePreguntaCita('Reservar cita para el dia: ' + this.fechaCitasolicitada + ' de ' + event.data.horarioinicio+ ' a ' + event.data.horariofin+ '??'  ).then((response) => {
        if (response.isConfirmed) {  
          this.onPagarCita(event.data);
        } 
      }) 
    }
  }

  onPagarCita(event : any){ 
    this.agregarCitaCalendario = event;
    console.log( 'agregarCitaCalendario 11 ', this.agregarCitaCalendario);
    this.modalPagarcita = true; 
  }


  onUpload(event : any) {    
    if(event){
    this.mostrarEnviarNotificacion = true;
      const file = event.files[0];
      if (file) {
        const reader = new FileReader(); 
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file); 
      }
    }
  }
 
  handleReaderLoaded(event : any) {
    this.ImgBase64 =   btoa(event.target.result);
  }   

  onEliminarArchivo(event :any): void{
    if(event){  
        this.mostrarEnviarNotificacion = false; 
        this.ImgBase64 = ""; 
        this.mostrarAdjuntar = false;  
    } 
  }
 
  
  onGrabarCita(){   
    const nuevaCita = {
      title: 'Nueva Cita' ,
      date: this.fechaCitasolicitada,
      start:   this.fechaCitasolicitada +'T'+  this.agregarCitaCalendario.horarioinicio,
      end: this.fechaCitasolicitada +'T'+  this.agregarCitaCalendario.horariofin
    } 

    let citas : any[] = []
    citas.push(nuevaCita) 
    citas = citas.concat(this.calendarOptions.events)
    this.calendarOptions = {...this.calendarOptions, ...{events: citas}}; 
    this.modalCita =false;
    this.modalPagarcita =false; 
  }
}
