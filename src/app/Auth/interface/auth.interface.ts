export interface IAuth{
    usuario: string, 
    password : string,
    token? : string,
    user?: string
}


export interface IUsuario {
    idusuario : number,
    usuario: string
    nombres: string,
    apellidoPaterno: string,
    apellidoMaterno: string, 
    fechaNacimiento: string, 
    sexo: string, 
    direccion: string, 
    correo: string, 
    telefono: number, 
    password: string, 
    isadmin : boolean,
    isdoctor : boolean,
    colegiatura? : string, 
}
 