export interface ApiResponse<T> {
    message: 'Accion realizada con exito';

    data: T;
}

export interface IViajes {
    idViajes: number;
    servicio: string;
    precioMinimo: number;
    idBus: number;
    numeroAsientos: string;
    idConductor: number;
    idRutas: number;
    fechaSalida: string;
    fechaLlegada: string;
}