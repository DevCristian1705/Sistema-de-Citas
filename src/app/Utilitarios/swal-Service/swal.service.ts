import { Injectable } from "@angular/core";   
import  Swal, { SweetAlertResult } from 'sweetalert2';
 
@Injectable({
    providedIn: 'root'
})
export class MensajesSwalService {
     

    mensajePreloader(condicion : boolean){
        if(condicion){
            Swal.fire({
               // title: 'Cargando',
                html: 'Cargando <br> Espere un momento por favor', 
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading()  
                }, 
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {}
         }) 
        }else{
            Swal.close();
        }
    }
 
   
    mensajeExito(mensaje: string) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Exito !',
            text: mensaje,
            showConfirmButton: false,
            timer: 3000
        });
    }
  
    mensajeInformacion(mensaje: string) {
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Información',
            text: mensaje,
            showConfirmButton: false,
            timer: 2000
        });
    }

    mensajeAdvertencia(mensaje: string) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Advertencia',
            text: mensaje,
            showConfirmButton: true,
        });
    }
 
    mensajeError(mensaje: any) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            text: mensaje,
            showConfirmButton: true,
        });
    }

    mensajePregunta(mensaje: string): Promise<SweetAlertResult<any>> {
        const promesa = new Promise<SweetAlertResult<any>>((resolve, reject) =>
        { Swal.fire({
            title: 'Confirmación',
            text: mensaje,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
          }).then(
              respuesta => {
                  resolve(respuesta);
              }
          )
        }); 
        return promesa;
    }
    mensajePreguntaCita(fecha: any, de: any, hasta : any): Promise<SweetAlertResult<any>> {
        const promesa = new Promise<SweetAlertResult<any>>((resolve, reject) =>
        { Swal.fire({
            title: 'Cita para el '+ fecha,
            text: 'horario: ' + de +' - ' + hasta,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Reservar',
            showDenyButton: true, 
            denyButtonText: `Reservar & Pagar`, 
            denyButtonColor: '#57BE6C',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
          }).then(
              respuesta => {
                  resolve(respuesta);
              }
          )
        }); 
        return promesa;
    }


    mensajeInfoCita(nombre: any, de: any, hasta : any, estado : string): Promise<SweetAlertResult<any>> {
        if(estado === 'PAGADO'){
            const promesa = new Promise<SweetAlertResult<any>>((resolve, reject) =>
            { Swal.fire({
                title: nombre,
                text: 'horario: ' + de +' - ' + hasta,
                icon: 'question',
                showCancelButton: false, 
                confirmButtonColor: '#3085d6', 
                confirmButtonText: 'Ok', 
              }).then(
                  respuesta => {
                      resolve(respuesta);
                  }
              )
            }); 
            return promesa;
        }else{ 
            const promesa = new Promise<SweetAlertResult<any>>((resolve, reject) =>
            { Swal.fire({
                title: nombre,
                text: 'horario: ' + de +' - ' + hasta,
                icon: 'question',
                showCancelButton: true,
                cancelButtonColor: '#57BE6C',
                cancelButtonText: 'Pagar Cita',
                confirmButtonColor: '#3085d6', 
                confirmButtonText: 'Ok', 
              }).then(
                  respuesta => {
                      resolve(respuesta);
                  }
              )
            }); 
            return promesa;
        }
       


    }


    separarCita(fechacita: any): Promise<SweetAlertResult<any>> {
        const promesa = new Promise<SweetAlertResult<any>>((resolve, reject) =>
          { Swal.fire({
                title: 'Cita para el día ' + fechacita,
                text: 'Ingrersar el nombre de la persona que será atendida',
                input: 'text',
                inputAttributes: {
                autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Separar',
                showLoaderOnConfirm: true, 
            }).then(
                respuesta => {
                    resolve(respuesta);
                }
            )
          }); 
          return promesa;
    }
  
}

