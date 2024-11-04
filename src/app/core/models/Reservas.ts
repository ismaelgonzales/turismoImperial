export interface ApiResponse<T> {
    message: 'Accion realizada con exito';

    data: T;
}

export interface IReservas {
    idReserva: number;
    idUsuario: number;
    idRutas: number;
    fechaReserva: string;
    idEstadoReserva: number;
    numeroAsientos: number;
    diaViaje: string;
    precioTotal: number;
    codigoBoleto: string;
    idCliente: number;
    estado: boolean;
}
