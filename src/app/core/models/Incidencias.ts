export interface ApiResponse<T> {
    message: 'Accion realizada con exito';

    data: T;
}

export interface IIncidencias {
    incidenciaId: number;
    idBus: number;
    idViaje: number;
    descripcion: string;
    fecha: Date;
    fechaRegistro: string;
}
