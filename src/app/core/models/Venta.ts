export interface ApiResponse<T> {
    message: 'Accion realizada con exito';

    data: T;
}

export interface IVenta {
    idVenta: number;
    codigoVenta: string;
    idUsuario: number;
    idReserva: number;
    nombrePasajero: string;
    numeroPasajes: number;
    origen: string;
    destino: string;
    fechaVenta: string;
    fechaViaje: string;
    montoTotal: number;
}
