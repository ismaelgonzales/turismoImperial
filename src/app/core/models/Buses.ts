export interface ApiResponse<T> {
    message: 'Accion realizada con exito';

    data: T;
}

export interface IBuses {
    idBuses: number;
    servicio: string;
    precioMinimo: number;
    precioPromedio: number;
    numeroAsientos: number;
    idConductor: number;
    idRutas: number;
    fechaSalida: string;
    fechaLlegada: string;
}
