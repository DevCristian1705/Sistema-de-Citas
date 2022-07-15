import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'; 
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service';
import { CitasService } from '../cita/service/citas.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';  
import { ConstantesGenerales, InterfaceColumnasGrilla } from 'src/app/Shared/interfaces/shared.interfaces';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
import { ReporteService } from './service/reporte.service';
import { IGCitas, IGDoctores } from './interface/reporte.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-reporte-citas',
  templateUrl: './reporte-citas.component.html',
  styleUrls: ['./reporte-citas.component.scss']
})
export class ReporteCitasComponent implements OnInit {
  
 // @ViewChild("exportContent") exportWord: ElementRef;
 // listacitas: any[];  
 // cols : InterfaceColumnasGrilla[]=[];
 // mostrartabla : boolean = false;
  dataGCitas : IGCitas[];
  dataGraficoCitas: any; 

  dataGDoctores : IGDoctores[];
  TotalCitasRegistradas : number = 0;
  dataGraficoDoctores: any; 
  horizontalOptions : any;
  horizontalOptions2 : any;

  Form: FormGroup;
  fechaActual = new Date();
  fechaInicio = new Date(this.fechaActual.getFullYear(), this.fechaActual.getMonth(), 1);
  fechaFin = new Date(this.fechaActual.getFullYear(), this.fechaActual.getMonth() + 2, 0);
  Altercolor: string = "#xxxxxx".replace(/x/g, y => (Math.random()*16|0).toString(16));;
 
  constructor( 
  //  public sanitizer: DomSanitizer,
    private swal : MensajesSwalService,
   // private generalService : CitasService
   private reporteService : ReporteService,
   private convert : DatePipe
  ){
    this.onForm();
  }  


  ngOnInit(): void {
   // this.onGenerarReporte(); 
   this.onGCitas();
   this.onGDoctores(null);
  }

  onForm(){
    this.Form = new FormGroup({ 
      FInicio : new FormControl(this.fechaInicio, Validators.required), 
      FFin : new FormControl(this.fechaFin, Validators.required), 
    });
  }

  onGCitas(){
    this.reporteService.getGraficoCitas().subscribe((resp) => {
      if(resp){
        this.dataGCitas = resp; 
        this.onArmarGraficoCitas();
      }
    })
  }

  onArmarGraficoCitas(){ 
    let arrayLabel :any [] = [];
    let arrayData :any [] = [];
    let arrayColor :any [] = [];

    this.dataGCitas.forEach(element => { 
      arrayLabel.push(element.estado);
      arrayData.push(element.cantidad);  
      if(element.estado === 'RESERVADO'){
        arrayColor.push('#ffff00'); 
      }else if(element.estado === 'PAGADO'){
        arrayColor.push('#008000'); 
      } else {
        arrayColor.push('#FF0000'); 
      } 
    })

    this.dataGraficoCitas = { 
      labels: arrayLabel, 
      datasets: [{ 
            label: 'Cantidad de Registros',
            backgroundColor:  arrayColor,
            data: arrayData, 
      }], 
    }   
    this.horizontalOptions2 = {
      indexAxis: 'x',
      scales: {
        yAxes: [{
          barPercentage: 0.5
        }]
      },
      plugins: {
          legend: {
            display: false,
              labels: {
                  color: '#495057'
              }
          }
      }, 
  };
  }



  onGDoctores(event : any){ 
    const data = this.Form.getRawValue();
    const fechas  = {
      f1 : this.convert.transform(!event ? this.fechaInicio : data.FInicio, ConstantesGenerales._FORMATO_FECHA_BUSQUEDA),//'2022-01-01',
      f2 : this.convert.transform(!event ? this.fechaFin : data.FFin, ConstantesGenerales._FORMATO_FECHA_BUSQUEDA) //'2022-12-01'
    }
    this.reporteService.getGraficoDoctores(fechas).subscribe((resp) => {
      if(resp){
        this.dataGDoctores = resp; 
        this.TotalCitasRegistradas =  this.dataGDoctores.reduce((sum, value)=> (sum + value.cantidad ?? 0 ), 0);
        this.onArmarGraficoDoctores();
        console.log('data doctores',this.dataGDoctores);
      }
    }) 
  }

  onArmarGraficoDoctores(){ 
    let arrayLabel :any [] = [];
    let arrayData :any [] = [];
    let arrayColor :any [] = [];

    this.dataGDoctores.forEach(element => {
      const color = "#xxxxxx".replace(/x/g, y => (Math.random()*16|0).toString(16));
      arrayLabel.push(element.doctor);
      arrayData.push(element.cantidad);  
      arrayColor.push(color);  
    })

    this.dataGraficoDoctores = {

      labels: arrayLabel, 
      datasets: [{  
            label: 'Cantidad de Registros',
            backgroundColor:  arrayColor,
            data: arrayData
      }],
   
    }   

    this.horizontalOptions = {
        indexAxis: 'y',
        plugins: {
            legend: {
              display: false,
                labels: {
                    color: '#495057'
                }
            }
        }, 
    };

  }





//     this.cols = [ 
//       { field: 'dni', header: 'DNI', visibility: true }, 
//       { field: 'usuario' , header:  'PACIENTE', visibility: true }, 
//       { field: 'doctor' , header:  'MEDICO', visibility: true }, 
//       { field: 'tipocita', header: 'TIPO', visibility: true }, 
//       { field: 'estado', header: 'ESTADO', visibility: true }, 
//       { field: 'idestadocita', header: 'idestado', visibility: false }, 
//       { field: 'fechacita', header: 'FECHA CITA', visibility: true , formatoFecha: ConstantesGenerales._FORMATO_FECHA_VISTA }, 
//       { field: 'horarioCita', header: 'HORA CITA', visibility: false}, 
//       { field: 'horainicio', header: 'HORA INCIO', visibility: true, formatoFecha: ConstantesGenerales._FORMATO_SOLO_HORA}, 
//       { field: 'horafin', header: 'HORA FIN', visibility: true, formatoFecha: ConstantesGenerales._FORMATO_SOLO_HORA},  
//     ];  
//     this.cols = this.cols.filter(x => x.visibility === true);
//   }
//  /* TRAEMOS LA DATA PARA GENERAR LOS REPORTES */
//   onGenerarReporte(){
//     const filter = {
//       idusuario :  0,
//       idusuariodoctor: 0,
//       fechacita: null
//     }  
//     this.swal.mensajePreloader(true); 
//     this.generalService.getHistorialCitas(filter).subscribe((resp) => { 
//       if(resp){ 
//         this.listacitas = resp.data 
//       }   
//       this.swal.mensajePreloader(false);
//     }) 
//   }
 
 
//   onDescargarExcel(){   
//     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listacitas);
//     const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
//     const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     this.saveAsExcelFile(excelBuffer,  "Reporte.xlsx"); 
//   }
//   saveAsExcelFile(buffer: any, fileName: string): void {
//     const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
//     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + '.xlsx');
//   }

//   onDescargarPDF(){
//     let exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
//     const doc = new jsPDF('p','pt');
//           autoTable(doc, {
//             columns: exportColumns,
//             body: this.listacitas,  
//             didDrawPage: (dataArg) => { 
//              doc.text('Reporte Citas', dataArg.settings.margin.left, 10);
//             }
//        }); 
//           doc.save('ReporteCitas.pdf');
//   }
 
//   onDescargarWord(){
//     let preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
//     let postHtml = "</body></html>";
//     let html = preHtml + this.exportWord + postHtml;
 
//     let url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html); 
//     let downloadLink = document.createElement("a"); 
//     document.body.appendChild(downloadLink);  
//     downloadLink.href = url; 
//     downloadLink.download = 'ReporteCitas'; 
//     downloadLink.click(); 
//     document.body.removeChild(downloadLink);
//   }

//   /* POR CONFIRMAR */
//   onDescargarHtml(){
//     // var blob = new Blob([this.onBase64ToArrayBuffer(this.listacitas)], {type: "application/pdf"}); 
//     // saveAs(blob, "ReporteCitas.pdf");
//   }

//   onDescargarXml(){
//     // var blob = new Blob([this.onBase64ToArrayBuffer(this.listacitas)], {type: "application/pdf"}); 
//     // saveAs(blob, "ReporteCitas.pdf");
//   }


}
