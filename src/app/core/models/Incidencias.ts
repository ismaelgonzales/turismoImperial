export interface ApiResponse<T> {
    message: 'Accion realizada con exito';

    data: T;
}

export interface IIncidencias {
    idIncidencias: number;
    idBuses: number;
    idViajes: number;
    descripcion: string;
    fecha: string;
    fechaRegistro: string;
    estado: boolean;
}
