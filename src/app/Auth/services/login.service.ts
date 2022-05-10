import { Injectable } from '@angular/core';  
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor( 
    private router : Router,
  ) { }
  
  logout(){   
    localStorage.clear(); 
    sessionStorage.clear();
    this.router.navigate(['/auth']);
  }

}
