export interface IHorariosDisponibles {
    iddoctor: number,
    nombres: string,
    idhorario: number,
    horainicio: string,
    horafin: string,
    isdiponible: boolean
}

export interface ICrearHorario{
    idusuariodoctor: number,
    idhorario: number,
    isdisponibel: boolean,
}

export interface IAllHorarios{
    idhorario: number,
    horainicio:  string,
    horafin:  string,
}