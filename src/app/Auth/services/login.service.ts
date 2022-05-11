import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';  
import { Router } from '@angular/router'; 
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  api = environment.apiUrl;

  constructor( 
    private router : Router,
    private http : HttpClient
  ) { }
  
  logout(){   
    localStorage.clear(); 
    sessionStorage.clear();
    this.router.navigate(['/auth']);
  }
 
 

  crearUsuario(data : IUsuario):Observable<any>{
      return this.http.post<IUsuario>(`${this.api}/api/usuario/crear`, data)
  }
  
}
