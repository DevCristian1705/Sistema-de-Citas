export interface IHorariosDisponibles {
    iddoctor: number,
    nombres: string,
    idhorario: number,
    horainicio: string,
    horafin: string,
    isdiponible: boolean
}

export interface IDiasAtencion{
    iddiasatencion: number,
    idusuariodoctor: number,
    diaatencion: string,
    nombredia :string
}
 

export interface ICrearDiasAtencion{
    diasatencion: string[],
    idusuariodoctor: number, 
}
 