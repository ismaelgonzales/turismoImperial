export interface ApiResponse<T> {
    message: 'Accion realizada con exito';

    data: T;
}
export interface IVehiculo {
    idVehiculo: number;
    matricula: string;
    marcaModelo: string;
    numeroAsientos: number;
    estadoVehiculo: string;
}
