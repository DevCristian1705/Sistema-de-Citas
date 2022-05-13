import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';   
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';   
import { ICita } from '../interface/cita.interface';
@Injectable({
  providedIn: 'root'
})
export class CitasService {
  
  api = environment.apiUrl;

  constructor(  
    private http : HttpClient
  ) { }
  
 
  getCitas(id: any):Observable<any>{
    return this.http.get<ICita>(`${this.api}/api/cita/listar/${id}`)
}

}
