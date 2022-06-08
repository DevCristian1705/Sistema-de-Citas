import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';   
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';   
import { ICrearcita, IHorariosDisponibles, IListaHirtoialCita } from '../interface/cita.interface';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  
  api = environment.apiUrl;

  constructor(  
    private http : HttpClient
  ) { }
   
  crear(data : ICrearcita):Observable<any>{
    return this.http.post<ICrearcita>(`${this.api}/api/cita/crear`, data)
  }

  getHistorialCitas(data:any):Observable<IListaHirtoialCita>{
    let params = new HttpParams();
    params = params.append('idusuario', data.idusuario);
    params = params.append('idusuariodoctor', data.idusuariodoctor);
    if(!!data.fechacita){
      params = params.append('fechacita', data.fechacita);
    } 
    return this.http.get<IListaHirtoialCita>(`${this.api}/api/cita/listar-historial`, { params: params });
  }
  
  getHorariosDisponibles(data: any ):Observable<IHorariosDisponibles>{ 
    let params = new HttpParams(); 
    params = params.append('idusuariodoctor', data.idusuariodoctor);
    if(!!data.fechacita){
      params = params.append('fechacita', data.fechacita);
    }  
    return this.http.get<IHorariosDisponibles>(`${this.api}/api/diasatencion/listar-horarios`, { params: params });
  }
}
