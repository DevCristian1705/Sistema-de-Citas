import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import { PrimeNGConfig } from 'primeng/api';
import { IUsuario } from 'src/app/Auth/interface/auth.interface';
import { ConstantesGenerales, InterfaceColumnasGrilla } from 'src/app/Shared/interfaces/shared.interfaces';
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service';  
import { DiasAtencionService } from '../../diasatencion/service/diasatecion.service';
import { DoctorService } from '../../doctor/service/doctor.service';  
import { CitasService } from '../service/citas.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.scss']
})
export class CrearCitaComponent implements OnInit {
  modalHorarioCita: boolean = false;
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
  FormCita: FormGroup; 
  FormPago : FormGroup;
  dateCombo : Date;
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
  listaCitas : any[]=[];

  idTipoCitaSeleccionado : number = 0; 
  idDiaAtencionSeleccionado : number = 0; 
  idEstadoCitaSeleccionado : number = 0;
  idDoctorSelccionado : number = 0;
  idUsuarioDoctorSeleccioando :number = 0;
  diaatencionSeleccionado : any;
  idcita: number = 0; 
  ColorDelEvent : string = 'yellow'
  dataEventEdit :any = [];
  Hoy = new Date(); 
  fechaActual  = new Date(this.Hoy.setMonth(this.Hoy.getMonth()+1));
  constructor(
    private swal : MensajesSwalService,
    private apiService: CitasService, 
    private apidiasAtencion: DiasAtencionService,
    private apiDoctor: DoctorService,
    private config : PrimeNGConfig,
    private formatDate : DatePipe,
    private router : Router
  ){
    this.builform(); 
      this.arrayTipoConsulta = [
      {nombre: 'CONSULTA', codigo: 1, precio: '50'},
      {nombre: 'TRATAMIENTO', codigo: 2, precio : '150'}, 
    ]
  }

  private builform(): void {
    this.FormCita = new FormGroup({
      odontologo: new FormControl( null),
      paciente: new FormControl( null, Validators.required), 
      horarioInicio: new FormControl( null, Validators.required), 
      horarioFin: new FormControl(null, Validators.required), 
    });

    this.FormPago = new FormGroup({
      dni: new FormControl( null),
      email: new FormControl( null, Validators.required), 
      nrotarjeta: new FormControl( null, Validators.required), 
      fechavencimiento: new FormControl(null, Validators.required),  
      cvv: new FormControl(null, Validators.required),  
    });

  }
 
  ngOnInit() {
    this.config.setTranslation(this.es)
    this.onCargarDoctores(); 

    this.colsDiasAtencion = [  
      { field: 'iddiasatencion', header: 'id', visibility: false  },
      { field: 'nombredia', header: 'DIA DE ATENCION', visibility: true  },  
      { field: 'diaatencion', header: 'FECHA', visibility: true,formatoFecha: ConstantesGenerales._FORMATO_FECHA_VISTA }, 
    ]; 
    this.colsDiasAtencion = this.colsDiasAtencion.filter(x => x.visibility === true)
    
    this.cols = [  
      { field: 'iddiasatencion', header: 'id', visibility: false  },  
      { field: 'horainicio', header: 'HORA INICIO', visibility: true},  
      { field: 'horafin', header: 'HORA FIN', visibility: true},   
    ];
    this.cols = this.cols.filter((x) => x.visibility === true)

  }
 
  onCargarDoctores(){
    this.apiDoctor.getDoctores().subscribe((resp)=> {  
      if(resp){
        this.arrayDoctores = resp.data; 
      }
    });
  }

  onSeleccionoDoctor(event :any){ 
    if(!event.value){   
      this.mostrardiasAtencion = false;
      this.mostrarCalendario = false;
      this.idDoctorSelccionado = 0;
      this.listaCitas = [];
    }else{ 
      if(this.idDoctorSelccionado != event.value.idusuario){ 
        this.onCargarDiasAtencion(event.value.idusuario); 
        this.mostrardiasAtencion = true;  
        this.mostrarCalendario = false;
        this.listaCitas = [];
      }else{
        return;
      }
      
    }
  }

  onCargarDiasAtencion(idusuario){ 
    this.swal.mensajePreloader(true);
    this.apidiasAtencion.getDiasAtencion(idusuario).subscribe((resp)=> {   
      if(resp){  
        this.onCargarListacitas();
        this.listaDiasAtencion = [...new Map(resp.data.map(item => [item['diaatencion'], item])).values()];
        this.swal.mensajePreloader(false);
      }
    });
  }

  onCargarHorariosDisponibles(){
    const filter = {
      idusuariodoctor:  this.idUsuarioDoctorSeleccioando, //data.idusuariodoctor,
      fechacita : this.diaatencionSeleccionado //this.formatDate.transform(data.diaatencion, ConstantesGenerales._FORMATO_FECHA_BUSQUEDA)
    }
    this.apiService.getHorariosDisponibles(filter).subscribe((resp)=> {   
      if(resp){ 
        this.listaHorarios = resp.data;
      }
    });
  }
  
  handleEventClick(clickInfo) {   
    if(clickInfo.event._def.extendedProps){
      this.dataEventEdit = clickInfo.event._def.extendedProps;
      this.idTipoCitaSeleccionado = this.dataEventEdit.idtipo;
      this.idDiaAtencionSeleccionado = this.dataEventEdit.iddiasatencion;
      this.idcita = this.dataEventEdit.idcita;
      this.modaldatosCitaEditar = true;  
    }

  }
  
  onSeleccionaDiaDisponible(event : any){   
    if(event){     
      this.idUsuarioDoctorSeleccioando = event.data.idusuariodoctor;
      this.diaatencionSeleccionado  = this.formatDate.transform(event.data.diaatencion, ConstantesGenerales._FORMATO_FECHA_BUSQUEDA)
      this.diaValidRange = { start:  event.data.diaatencion, end: event.data.diaatencion} 
      this.mostrarCalendario = true; 
      this.onCargarHorariosDisponibles();  
      this.configCalendario();
    }
  }
 
  configCalendario(){ 
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      locale : 'es-Pe',
      timeZone: 'America/Lima',
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
      eventColor: this.ColorDelEvent,
      dateClick: this.handleDateClick.bind(this), 
      events: this.listaCitas,  
      eventClick: this.handleEventClick.bind(this),
      selectMirror: true, 
      hiddenDays : [0], 
      validRange :  this.diaValidRange,  
      showNonCurrentDates : false,
       
    };  
  }

  onCargarListacitas(){
    const filter = {
      idusuario : this.dataDesencryptada.isadmin ? 0 : +this.dataDesencryptada.idusuario,
      idusuariodoctor : this.idDoctorSelccionado, //iddoctor,
      fecha : null
    } 
    this.listaCitas = [];
    this.apiService.getHistorialCitas(filter).subscribe((resp)=> {  
      if(resp.data){
        let  ObjCitas : any = resp.data
          ObjCitas.forEach(element => { 
          if(element.estado === 'RESERVADO'){
            this.ColorDelEvent = 'yellow'
          }else if(element.estado === 'PAGADO'){
            this.ColorDelEvent = 'green'
          }else{
            this.ColorDelEvent = 'red'
          }
         //let idTipoCita = this.arrayTipoConsulta.find(x => x.nombre === element.tipocita)
          this.listaCitas.push(
            {
              title: element.tipocita, 
              date: element.diaatencion, 
              start: element.horainicio, 
              end: element.horafin, 
              color : this.ColorDelEvent,
              usuario: element.usuario,
              diaatencion : element.fechacita,
              horainicio: element.horainicio, 
              horafin: element.horafin, 
              idcita: element.idcita, 
              idusuario: element.idusuario, 
              estado : element.estado,
              tipo : element.tipocita,
              idtipo : element.idtipocita, //idTipoCita.codigo,
              iddiasatencion: element.iddiasatencion
            })
        });  
      }
    }); 

  }
 
  handleDateClick(arg) {  
    if(!this.listaHorarios.length){
      this.swal.mensajeAdvertencia('No quedan horarios disponibles para este dia.');
    }else{
      this.fechaCitasolicitada = arg.dateStr;
      this.precioConsultaSeleccionada = null
      this.modalHorarioCita= true;
    }
  }
  
  onSeleccionarTipoConsulta(event: any){  
    if(!event.value){ 
      this.precioConsultaSeleccionada = null
    }else{
      this.idTipoCitaSeleccionado = event.value.codigo;
      this.precioConsultaSeleccionada = event.value.precio
    }
  } 

  onSeleccionarHorario(event : any){    
    if(!this.precioConsultaSeleccionada){
      this.swal.mensajeAdvertencia('Selecciona un tipo de consulta.');
      return;
    }
    if(event){ 
      this.idDiaAtencionSeleccionado = event.data.iddiasatencion
      let fechacitaFormat = this.formatDate.transform(this.fechaCitasolicitada, ConstantesGenerales._FORMATO_FECHA_VISTA)
      let hi = this.formatDate.transform(event.data.horainicio, ConstantesGenerales._FORMATO_SOLO_HORA)
      let hf = this.formatDate.transform(event.data.horafin, ConstantesGenerales._FORMATO_SOLO_HORA) 
      this.swal.mensajePreguntaCita(fechacitaFormat, hi , hf).then((response) => { 
        if(response.isConfirmed) {   //CONFIRME  === RESERVAR  
          this.idEstadoCitaSeleccionado = 1
          this.onGrabarCita();
        } 
        if(response.isDenied) {    //DENIED  === RESERVAR  Y PAGAR  
          this.onPagarCita();
        } 
      }) 
    }
  }

  onPagarCita(){   
    this.FormPago.patchValue({
      dni: this.dataDesencryptada.dni,
      email: this.dataDesencryptada.correo
    })
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

  onPagoCitaConfirmada(){ 
    this.swal.mensajePregunta('¿Seguro de realizar el pago de la cita?').then((response) => { 
      if(response.isConfirmed) { 
        this.idEstadoCitaSeleccionado = 2
        this.onGrabarCita();
      }  
    }) 
  }
    
  onGrabarCita(){    
    const data = {
      idcita : this.idcita ? this.idcita : 0,
      idusuario: +this.dataDesencryptada.idusuario,
      iddiasatencion : this.idDiaAtencionSeleccionado,
      idestadocita : this.idEstadoCitaSeleccionado,  //** 1 => RESERVADO 2=> PAGADO 3 => ELIMINADO **//
      idtipocita: this.idTipoCitaSeleccionado,
    }
 
    this.apiService.crear(data).subscribe((resp => {
      if(resp.data){
        this.swal.mensajeExito('Se grabaro lo cita correctamente!');
        this.modalPagarcita =false;  
        this.modaldatosCitaEditar = false;
        this.modalHorarioCita =false;
        this.onCargarListacitas();
        this.configCalendario();
        this.onCargarHorariosDisponibles();
      }else{
        this.swal.mensajeError(resp.mensaje);
      }
    }))
   
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
    
 
}
