import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'; 
import { MensajesSwalService } from 'src/app/Utilitarios/swal-Service/swal.service';
import { CitasService } from '../cita/service/citas.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';  
import { ConstantesGenerales, InterfaceColumnasGrilla } from 'src/app/Shared/interfaces/shared.interfaces';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"


@Component({
  selector: 'app-reporte-citas',
  templateUrl: './reporte-citas.component.html',
  styleUrls: ['./reporte-citas.component.scss']
})
export class ReporteCitasComponent implements OnInit {
  
  @ViewChild("exportContent") exportWord: ElementRef;
  listacitas: any[];  
  cols : InterfaceColumnasGrilla[]=[];
  mostrartabla : boolean = false;

  constructor( 
    public sanitizer: DomSanitizer,
    private swal : MensajesSwalService,
    private generalService : CitasService
  ){
   
  }  

  ngOnInit(): void {
    this.onGenerarReporte(); 

    this.cols = [ 
      { field: 'dni', header: 'DNI', visibility: true }, 
      { field: 'usuario' , header:  'PACIENTE', visibility: true }, 
      { field: 'doctor' , header:  'MEDICO', visibility: true }, 
      { field: 'tipocita', header: 'TIPO', visibility: true }, 
      { field: 'estado', header: 'ESTADO', visibility: true }, 
      { field: 'idestadocita', header: 'idestado', visibility: false }, 
      { field: 'fechacita', header: 'FECHA CITA', visibility: true , formatoFecha: ConstantesGenerales._FORMATO_FECHA_VISTA }, 
      { field: 'horarioCita', header: 'HORA CITA', visibility: false}, 
      { field: 'horainicio', header: 'HORA INCIO', visibility: true, formatoFecha: ConstantesGenerales._FORMATO_SOLO_HORA}, 
      { field: 'horafin', header: 'HORA FIN', visibility: true, formatoFecha: ConstantesGenerales._FORMATO_SOLO_HORA},  
    ];  
    this.cols = this.cols.filter(x => x.visibility === true);
  }
 /* TRAEMOS LA DATA PARA GENERAR LOS REPORTES */
  onGenerarReporte(){
    const filter = {
      idusuario :  0,
      idusuariodoctor: 0,
      fechacita: null
    }  
    this.swal.mensajePreloader(true); 
    this.generalService.getHistorialCitas(filter).subscribe((resp) => { 
      if(resp){ 
        this.listacitas = resp.data 
      }   
      this.swal.mensajePreloader(false);
    }) 
  }
 
 
  onDescargarExcel(){   
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listacitas);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer,  "Reporte.xlsx"); 
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
    FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + '.xlsx');
  }

  onDescargarPDF(){
    let exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    const doc = new jsPDF('p','pt');
          autoTable(doc, {
            columns: exportColumns,
            body: this.listacitas,  
            didDrawPage: (dataArg) => { 
             doc.text('Reporte Citas', dataArg.settings.margin.left, 10);
            }
       }); 
          doc.save('ReporteCitas.pdf');
  }
 
  onDescargarWord(){
    let preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    let postHtml = "</body></html>";
    let html = preHtml + this.exportWord + postHtml;
 
    let url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html); 
    let downloadLink = document.createElement("a"); 
    document.body.appendChild(downloadLink);  
    downloadLink.href = url; 
    downloadLink.download = 'ReporteCitas'; 
    downloadLink.click(); 
    document.body.removeChild(downloadLink);
  }

  /* POR CONFIRMAR */
  onDescargarHtml(){
    // var blob = new Blob([this.onBase64ToArrayBuffer(this.listacitas)], {type: "application/pdf"}); 
    // saveAs(blob, "ReporteCitas.pdf");
  }

  onDescargarXml(){
    // var blob = new Blob([this.onBase64ToArrayBuffer(this.listacitas)], {type: "application/pdf"}); 
    // saveAs(blob, "ReporteCitas.pdf");
  }


}
