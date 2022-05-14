import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';   
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';   
import { IDiasAtencion, IHorariosDisponibles } from '../interface/horario.interface';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  
  api = environment.apiUrl;

  constructor(  
    private http : HttpClient
  ) { }
   
  
  crearHorario(data : IHorariosDisponibles):Observable<any>{
      return this.http.post<IHorariosDisponibles>(`${this.api}/api/horario/crear`, data)
  }
  

  getHorarios(id : number):Observable<any>{
    return this.http.get<IHorariosDisponibles>(`${this.api}/api/horario/listar/${id}`)
  }

  /** DIAS ATENCION */

  crearDiasAtecion(data : any):Observable<any>{
    return this.http.post<any[]>(`${this.api}/api/diasatencion/crear`, data)
}

  getDiasAtencion(id : number):Observable<any>{
    return this.http.get<IDiasAtencion>(`${this.api}/api/diasatencion/listar/${id}`)
  }


 

}
