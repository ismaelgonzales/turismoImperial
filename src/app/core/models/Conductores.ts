export interface ApiResponse<T> {
    message: 'Accion realizada con exito';

    data: T;
}

export interface IConductores {
    idConductor: number;
    nombre: string;
    apellidos: string;
    numeroLicencia: string;
    fechaNacimiento: string;
    telefono: string;
    fechaContratacion: string;
    estado: string;
    fechaRegistro: string;
}
