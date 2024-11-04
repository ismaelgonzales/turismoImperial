export interface ApiResponse<T> {
    message: 'Accion realizada con exito';
    data: T;
}

export interface IBuses {
    idBuses: number;
    matricula: string;
    marcaModelo: string;
    precioMinimo: number;
    precioPromedio: number;
    numeroAsientos: number;
    idConductor: number;
    idRutas: number;
    estado: boolean;
}
