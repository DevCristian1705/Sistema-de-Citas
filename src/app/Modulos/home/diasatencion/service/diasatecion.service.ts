import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';   
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';   
 
@Injectable({
  providedIn: 'root'
})
export class DiasAtencionService {
  
  api = environment.apiUrl;

  constructor(  
    private http : HttpClient
  ) { }
    

  /** DIAS ATENCION */ 
  crearDiasAtecion(data : any):Observable<any>{
    return this.http.post<any[]>(`${this.api}/api/diasatencion/crear`, data)
}

  getDiasAtencion(id : number):Observable<any>{
    return this.http.get<any>(`${this.api}/api/diasatencion/listar/${id}`)
  }


 

}
