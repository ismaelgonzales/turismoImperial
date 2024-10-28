export interface ApiResponse<T> {
    message: 'Accion realizada con exito';

    data: T;
}

export interface IReservas {
    idReserva: number;
    idUsuario: number;
    idRutas: number;
    fechaReserva: string;
    estadoReservaId: string;
    numeroAsientos: number;
    precioTotal: number;
    codigoBoleto: string;
}
