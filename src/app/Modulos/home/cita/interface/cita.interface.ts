export interface ICrearcita { 
    idusuario: number,
    iddiasatencion : number,
    idestadocita : number,
    idtipocita: number,
}
 
export interface IListaHirtoialCita{ 
    data: IHistorialCita[],
    message: string
    status: number
}

export interface IHistorialCita{  
    idusuario: number,
    dni: string,
    usuario: string,
    idusuariodoctor: number,
    doctor: string,
    estado: string,
    fechacita: string,
    horainicio: string,
    horafin: string,
    tipocita: string, 
    idcita: number, 
}
 
export interface IHorariosDisponibles{
    data: IHorarios[],
    message: string
    status: number
}


export interface IHorarios{  
    iddiasatencion: number,
    idusuariodoctor: number,
    doctor: string, 
    horainicio: string,
    horafin: string, 
}

       