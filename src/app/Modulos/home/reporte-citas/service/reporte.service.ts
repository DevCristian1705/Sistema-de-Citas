import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';   
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';    
import { IGCitas, IGDoctores } from '../interface/reporte.interface';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  
  api = environment.apiUrl;

  constructor(  
    private http : HttpClient
  ) { }

  getGraficoDoctores(data:any):Observable<IGDoctores[]>{
    let params = new HttpParams();
    params = params.append('FInicio', data.f1);
    params = params.append('FFin', data.f2); 
    return this.http.get<IGDoctores[]>(`${this.api}/api/graficos/doctores`, { params: params });
  }
  

  getGraficoCitas():Observable<IGCitas[]>{
    return this.http.get<IGCitas[]>(`${this.api}/api/graficos/citas`);
  }
  
}