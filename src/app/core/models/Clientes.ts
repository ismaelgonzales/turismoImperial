export interface ApiResponse<T> {
    message: 'Accion realizada con exito';

    data: T;
}

export interface IClientes {
    idCliente: number;
    nombres: string;
    apellidos: string;
    tipoDocumento: string;
    numeroDocumento: string;
    razonSocial: string;
    email: string;
    telefono: string;
    edad: number;
    direccion: string;
    estado: boolean;
    fechaCreacion: string;
}
