import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';   
import { Observable } from 'rxjs'; 
import { IUsuario } from 'src/app/Auth/interface/auth.interface';
import { environment } from 'src/environments/environment';   

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  
  api = environment.apiUrl;

  constructor(  
    private http : HttpClient
  ) { }
  
 

  crearDoctor(data : IUsuario):Observable<any>{
      return this.http.post<IUsuario>(`${this.api}/api/usuario/crear`, data)
  }
  

  getDoctores():Observable<any>{
    return this.http.get<IUsuario>(`${this.api}/api/usuario/listardoctores`)
  }


}
