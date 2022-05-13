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
    iddoctor: number,
    diaatencion: string,
    nombredia :string
}