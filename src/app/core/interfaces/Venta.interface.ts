export interface Venta {
    idVenta: number;
    codigoVenta: string;
    idUsuario: number;
    idReserva: number;
    nombrePasajero: string;
    numeroPasajes: number;
    origen: string;
    destino: string;
    fechaVenta: Date;
    fechaViaje: Date;
    montoTotal: number;
}
