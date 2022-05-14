import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { CalendarOptions } from '@fullcalendar/core';
import { PrimeNGConfig } from 'primeng/api';
import { IUsuario } from 'src/app/Auth/interface/auth.interface';
import { ConstantesGenerales, InterfaceColumnasGrilla } from 'src/app/Shared/interfaces/shared.interfaces';
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service';  
import { DoctorService } from '../../doctor/service/doctor.service'; 
import { HorarioService } from '../../horario/service/horario.service'; 
import { CitasService } from '../service/citas.service';

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
  mostrardiasAtencion: boolean = false;
  datosCitaEditar: any[] = [];
  agregarCitaCalendario :any
  mostrarAdjuntar : boolean =false;
  mostrarEnviarNotificacion : boolean =false;
  ImgBase64 : string = "";

  dataCita : any[]=[];
  fechaCitasolicitada :any
  citaForm: FormGroup; 
  es = ConstantesGenerales.ES_CALENDARIO
  arrayDoctores : IUsuario[]; 
  arrayTipoConsulta : any []= [];
  listaHorarios : any[] = [];
  listaDiasAtencion : any[] = [];
  nuevaCitas :any[] = [];
  diaValidRange : any;

  cols: InterfaceColumnasGrilla[] = []; 
  colsDiasAtencion: InterfaceColumnasGrilla[] = []; 
  precioConsultaSeleccionada: string = "";
  dataDesencryptada : any = JSON.parse(sessionStorage.getItem('datosUsuario'))
  calendarOptions: CalendarOptions   
  CantidadHorarioDisponible : number = 0;
  listaCitas : any[]=[];

  constructor(
    private swal : MensajesSwalService,
    private apiService: DoctorService,
    private apiHorario: HorarioService,
    private apiCitas: CitasService,
    private config : PrimeNGConfig,
    private formatDate : DatePipe
  ){
    this.builform(); 
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
    this.onCargarDoctores();
    this.onCargarListacitas();
   
    this.cols = [  
      { field: 'idcita', header: 'id', visibility: false  },  
      { field: 'horainicio', header: 'Hora Inicio', visibility: true},  
      { field: 'horafin', header: 'Hora Fin', visibility: true},   
    ];
    this.cols = this.cols.filter(x => x.visibility === true)

    this.colsDiasAtencion = [  
      { field: 'iddiasatencion', header: 'id', visibility: false  },
      { field: 'nombredia', header: 'Dia de la Semana', visibility: true  },  
      { field: 'diaatencion', header: 'Fecha', visibility: true,formatoFecha: ConstantesGenerales._FORMATO_FECHA_VISTA }, 
    ];

    this.colsDiasAtencion = this.colsDiasAtencion.filter(x => x.visibility === true)
   
  }

  onCargarListacitas(){
    this.apiCitas.getCitas(+this.dataDesencryptada.idusuario).subscribe((resp)=> {  
      if(resp.data){
        let  ObjCitas : any = resp.data
        ObjCitas.forEach(element => {
          this.listaCitas.push({title: element.usuario, date: element.fecha , start: element. horainicio, end: element.horafin, id: element.idcita})
        });   
      }
    });

  }


  configCalendario(){ 
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      locale : 'es-Pe',
      timeZone: 'es',
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
      // COLOR DEL EVENTO ITEMS 
      dateClick: this.handleDateClick.bind(this), 
      events: this.listaCitas,  
      eventClick: this.handleEventClick.bind(this),
      selectMirror: true, 
      hiddenDays : [0], 
      validRange :  this.diaValidRange,  
      showNonCurrentDates : false,
       
    };  
  }

  
 
  handleEventClick(clickInfo) {  
    let horainicioReal = new Date(new Date(clickInfo.event._instance.range.start).setHours(clickInfo.event._instance.range.start.getHours() + 5)); 
    let horafinReal = new Date(new Date(clickInfo.event._instance.range.end).setHours(clickInfo.event._instance.range.end.getHours() + 5)); 
  
    let hi = this.formatDate.transform(horainicioReal, ConstantesGenerales._FORMATO_HORA)
    let hf = this.formatDate.transform(horafinReal, ConstantesGenerales._FORMATO_HORA)
     this.swal.mensajeInfoCita(clickInfo.event._def.title, hi,  hf).then((response) => {
        if (response.isConfirmed) { 
          return  
        } 
      })   

  }
 
  onCargarDoctores(){
    this.apiService.getDoctores().subscribe((resp)=> {  
      if(resp){
        this.arrayDoctores = resp.data;
      }
    });
  }


  onCargarDiasAtencion(idusuario){ 
    this.apiHorario.getDiasAtencion(idusuario).subscribe((resp)=> {  
      if(resp){
        this.listaDiasAtencion = resp.data
      }
    });
  }


  onCargarHorariosDisponibles(idusuario : number){  
    this.apiHorario.getHorarios(idusuario).subscribe((resp)=> { 
      if(resp){
        this.CantidadHorarioDisponible =  resp.data.length;
        this.listaHorarios = resp.data
      }
    });
  }


 

  onSeleccionoDoctor(event :any){ 
    if(event.value){   
      this.mostrardiasAtencion = true; 
      this.onCargarDiasAtencion(event.value.idusuario);  
      this.onCargarHorariosDisponibles(event.value.idusuario);  
    }else{ 
      this.mostrardiasAtencion = false;
      this.mostrarCalendario = false;
    }
  }

  handleDateClick(arg) {  
   this.fechaCitasolicitada = arg.dateStr;
   this.precioConsultaSeleccionada = null
   this.modalCita= true;
  }
 

  onSeleccionarTipoConsulta(event: any){  
    if(!event.value){
      this.precioConsultaSeleccionada = null
    }else{
      this.precioConsultaSeleccionada = event.value.precio
    }
  }
 
  onSeleccionaDiaDisponible(event : any){ 
    if(event){ 
      if(this.CantidadHorarioDisponible){
        let diaDisponible = event.data.diaatencion
        let dia = this.formatDate.transform(diaDisponible, ConstantesGenerales._FORMATO_FECHA_BUSQUEDA)
        this.diaValidRange = { start:  dia, end: dia} 
        this.mostrarCalendario = true;
        this.configCalendario();
      }else{
        this.swal.mensajeInformacion("No quedan horarios disponibles");
      }
      
    } 
  }

  onSeleccionarHorario(event : any){    
    if(!this.precioConsultaSeleccionada){
      this.swal.mensajeAdvertencia('Selecciona un tipo de consulta.');
      return;
    }
    if(event){ 
      let fechacitaFormat = this.formatDate.transform(this.fechaCitasolicitada, ConstantesGenerales._FORMATO_FECHA_VISTA)
      this.swal.mensajePreguntaCita(fechacitaFormat,event.data.horainicio,event.data.horafin).then((response) => {
        if (response.isConfirmed) {   
          this.onPagarCita(event.data);
        } 
      }) 
    }
  }

  onPagarCita(event : any){  
    this.agregarCitaCalendario = event; 
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
     
    let fechacitaFormat = this.formatDate.transform(this.fechaCitasolicitada, ConstantesGenerales._FORMATO_FECHA_BUSQUEDA)

    const nuevaCita = {
      title:this.dataDesencryptada.usuario + ' ' +this.dataDesencryptada.apePaterno + ' ' +this.dataDesencryptada.apeMaterno ,
      date: this.fechaCitasolicitada,
      start: fechacitaFormat+'T'+  this.agregarCitaCalendario.horainicio,
      end: fechacitaFormat+'T'+  this.agregarCitaCalendario.horafin
    } 
    console.log('fechacitaFormat',nuevaCita);
    this.listaCitas.push(nuevaCita)
    // let citas : any[] = []
    // citas.push(nuevaCita) 
    // citas = citas.concat(this.calendarOptions.events)
    // this.calendarOptions = {...this.calendarOptions, ...{events: citas}}; 
    this.modalCita =false;
    this.modalPagarcita =false; 
  }


   

}
